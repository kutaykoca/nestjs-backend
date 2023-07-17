import sys
import math
import analysis
import json

def read_data_from_nodejs():
    """
    Read data from Node.js stdin.

    Returns:
        str: The data read from stdin.
    """

    """
    Node.js stdin'den veri okur.

    Geri dönüşler:
        str: stdin'den okunan veri.
    """
    data = sys.stdin.readline()
    return data

def convert_data_to_json(data):
    """
    Convert data to JSON format.

    Args:
        data (str): The data to convert.

    Returns:
        dict: The data in JSON format.
    """

    """
    Verileri JSON biçimine dönüştürür.

    Args:
        data (str): Dönüştürülecek veri.

    Döndürür:
        dict: JSON biçimindeki veri.
    """
    json_data = json.loads(data)
    return json_data

def calculate_distance(json_data):
    """
    Calculate the closest stops for the given JSON data.

    Args:
        json_data (dict): The JSON data.

    Returns:
        list: The closest stops.
    """

    """
    Verilen JSON verisi için en yakın durakları hesaplar.

    Args:
        json_data (dict): JSON verisi.

    Döndürür:
        liste: En yakın duraklar.
    """
    distance = analysis.getClosestStops(json_data)
    return distance

def send_data_to_nodejs(distance):
    """
    Send data to Node.js stdout.

    Args:
        distance (list): The data to send.
    """

    """
    Node.js stdout'a veri gönderir.

    Args:
        mesafe (liste): Gönderilecek veri.
    """
    sys.stdout.write(json.dumps(distance))
    sys.stdout.flush()

# Read data from Node.js
# Node.js'den veri okuyun
data = read_data_from_nodejs()

# Convert data to JSON
# Verileri JSON'a dönüştürün
json_data = convert_data_to_json(data)

# Calculate distance
# Mesafeyi hesapla
distance = calculate_distance(json_data)

# Send data to Node.js
# Node.js'ye veri gönder
send_data_to_nodejs(distance)
