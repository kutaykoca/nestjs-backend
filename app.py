# This code is using the `subprocess` module in Python to run a Node.js script. It starts by defining
# the command to run the Node.js script, which is `"node src/index.js"`. Then, it uses the
# `subprocess.Popen()` function to create a new process and execute the command. The `shell=True`
# argument is used to run the command in a shell environment. Finally, the code waits for the process
# to finish executing using the `process.wait()` method. If any exception occurs during the execution,
# it will be caught and printed.
# This code is using the `subprocess` module in Python to run a Node.js script.


# Bu kod, bir Node.js betiğini çalıştırmak için Python'daki `subprocess` modülünü kullanıyor. Tanımlayarak başlar
# Node.js betiğini çalıştıracak komut, yani `"node src/index.js"`. Ardından, şu komutu kullanır
# Yeni bir süreç oluşturmak ve komutu çalıştırmak için `subprocess.Popen()` işlevini kullanın. Shell=True`
# argümanı, komutu bir kabuk ortamında çalıştırmak için kullanılır. Son olarak, kod işlem için bekler
#`process.wait()` yöntemini kullanarak yürütmeyi bitirmek için #. Yürütme sırasında herhangi bir istisna oluşursa,
# yakalanacak ve yazdırılacaktır.
# Bu kod, bir Node.js betiğini çalıştırmak için Python'daki `subprocess` modülünü kullanıyor.
import subprocess

node_command = "node src/index.js"

try:
    process = subprocess.Popen(node_command, shell=True)
    process.wait()
except Exception as e:
    print(e)