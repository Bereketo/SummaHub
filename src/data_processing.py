from datasets import Dataset, load_dataset, load_metric


huggingface_dataset_name = "cnn_dailymail"


def load_data(huggingface_dataset_name):
    """Load the dataset"""
    return load_dataset(huggingface_dataset_name, "3.0.0")

def see_sample(dataset):
    """See the sample dataset."""

    key_article = "article"
    key_highlights = "highlights"

    sample = dataset["train"][1]
    article = sample[key_article]
    print(f"Article (excerpt of 500 characters, total_length: {len(article)}):")
    print(article[:500])

    summary = sample[key_highlights]
    print(f'\nSummary (Length: {len(summary)}):')
    print(summary)


def create_formatted_instruction(dialogue_text: str, summary_text: str):
    """Create a formatted instruction for the model."""
    formatted_instruction = f"""
    ### Instruction:
    Summarize the following conversation


    ### Input:
    {dialogue_text.strip()}


    ### Summary:
    {summary_text.strip()}
    """.strip()

    return formatted_instruction

def create_instruction_dataset(data_point):
    """Create the instruction dataset from a data point."""
    article = data_point["article"]
    highlights = data_point["highlights"]
    text = create_formatted_instruction(article, highlights)

    return {
            "article": article,
            "highlights": highlights,
            "text": text
            }

def process_data(dataset: Dataset):
    """Shuffle, map, and remove columns from the dataset."""
    processed_dataset = (
            dataset
            .shuffle(seed=42)
            .map(create_instruction_dataset)
            .remove_columns(['id'])
            )

    return processed_dataset


def process_all_splits(dataset):
    """Process all the splits of the dataset."""
    dataset["train"] = process_data(dataset["train"])
    dataset["test"] = process_data(dataset["validation"])
    dataset["validation"] = process_datse(dataset["validation"])

    return dataset


def select_data(dataset, num_train=1000, num_test=100, num_val=100):
    """Select a subset of data from each split."""
    train_data = dataset["train"].shuffle(seed=42).select(range(num_train))
    test_data = dataset["test"].shuffle(seed=42).select(range(num_test))
    validation_data = dataset["validation"].shuffle(seed=42).select(range(num_va))
    
    return train_data, test_data, validation_data
