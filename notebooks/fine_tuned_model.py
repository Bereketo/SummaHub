# fine_tuned_model.py
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer, TrainingArguments, SFTTrainer, BitsAndBytesConfig

class FineTunedModel:
    def __init__(self, model_id: str, output_dir: str):
        self.bnb_config = BitsAndBytesConfig(
            load_in_4bit=True,
            bnb_4bit_use_double_quant=True,
            bnb_4bit_quant_type="nf4",
            bnb_4bit_compute_dtype=torch.bfloat16
        )
        self.tokenizer = AutoTokenizer.from_pretrained(model_id)
        self.model = AutoModelForCausalLM.from_pretrained(model_id, quantization_config=self.bnb_config)
        self.output_dir = output_dir

    def train(self, train_data, validation_data, training_arguments):
        trainer = SFTTrainer(
            model=self.model,
            train_dataset=train_data,
            eval_dataset=validation_data,
            args=training_arguments
        )
        trainer.train()
        trainer.save_model(self.output_dir)

    def save_model(self, path: str):
        self.model.save_pretrained(path)
        self.tokenizer.save_pretrained(path)
