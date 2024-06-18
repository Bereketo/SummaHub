# training_data.py
from datasets import load_dataset, Dataset

class TrainingData:
    def __init__(self, dataset_name: str, version: str):
        self.dataset = load_dataset(dataset_name, version)

    def process_dataset(self, data: Dataset):
        def generate_instruction_dataset(data_point):
            # Function body remains the same as in the notebook
            pass

        return (
            data.shuffle(seed=42)
            .map(generate_instruction_dataset).remove_columns(['id'])
        )

    def prepare_data_splits(self):
        self.dataset["train"] = self.process_dataset(self.dataset["train"])
        self.dataset["test"] = self.process_dataset(self.dataset["validation"])
        self.dataset["validation"] = self.process_dataset(self.dataset["validation"])

        train_data = self.dataset['train'].shuffle(seed=42).select([i for i in range(1000)])
        test_data = self.dataset['test'].shuffle(seed=42).select([i for i in range(100)])
        validation_data = self.dataset['validation'].shuffle(seed=42).select([i for i in range(100)])

        return train_data, test_data, validation_data
