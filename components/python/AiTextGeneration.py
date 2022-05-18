import sys
from aitextgen import aitextgen

prompt = sys.argv[1];
# print("Output from Python")
#print("prompt: " + sys.argv[1])
# print("Last name: " + sys.argv[2])
ai = aitextgen(model="EleutherAI/gpt-neo-125M");

text = ai.generate(
    n=1, 
    prompt=prompt, 
    max_length=100, 
    temperature=0.7,
    do_sample=True,
    return_as_list=True
)
sys.stdout.write(str(text))
#print(text)
sys.stdout.flush(),
sys.exit(0)