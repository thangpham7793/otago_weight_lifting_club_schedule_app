import sys


def make_list():
    file_name = sys.argv[1]
    f = open(file_name, "r")
    exercises = f.readlines()
    exercises = list(map(lambda x: x.strip(), exercises))
    f.close()
    new_file = open(f'{file_name.split(".")[0]}_list.txt', "w")
    new_file.write(f'{file_name.split(".")[0]} = {exercises}')
    f.close()


make_list()
