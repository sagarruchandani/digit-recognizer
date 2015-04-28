
import PIL
from PIL import Image
def ImageConv(filepath):
    
    basewidth = 28
    hsize = 28
    image_file = Image.open(filepath)
    image_file= image_file.convert('L') # convert image to monochrome - this works
    image_file = image_file.resize((basewidth,hsize), PIL.Image.ANTIALIAS)
    pix_val = list(image_file.getdata())
    #pix_val = image_file.getdata()
    #pix_val_flat = [x for sets in pix_val for x in sets]
    print (pix_val)
    return pix_val
   
ImageConv("/home/shivi/Pictures/GumballInspector.png")