import numpy as np
import base64
from StringIO import StringIO
from PIL import Image
import sys

def transform(data):
        image_string = data[0]
        STANDARD_SIZE = (50, 50)
        f = StringIO(base64.decodestring(image_string))
        img = Image.open(f)
        img = img.getdata()
        img = img.resize(STANDARD_SIZE)
        img = map(list, img)
        img = np.array(img)
        s = img.shape[0] * img.shape[1]
        img_wide = img.reshape(1, s)
        return img_wide[0]

if __name__ == '__main__':
   image_string = sys.argv[1]
   transform(image_string)
