import sys
import uuid
import os
import json

def extract_filenames():
    root_folder = "./public/img"
    marcos = []
    for root, dirs, files in os.walk(root_folder, topdown=False):
        print(root)
        for name in files:
            obj = {}
            obj["id"] = str(uuid.uuid4())
            obj["date"] = ""
            obj["original"] = "./img/"+name
            obj["captioned"] = "./img/"+""
            obj["thumbnail"] = "./img/"+""
            obj["comment"] = ""
            obj["tags"] = []
            obj["hasProfanity"] = False
            obj["isVideo"] = False
            obj["intoxicationLevel"] = 0
            marcos.insert(0, obj)
    text = json.dumps(marcos)
    with open("./public/marcomanifest.json", "a") as f:
        f.write(text)
        f.close()
            
extract_filenames()                

