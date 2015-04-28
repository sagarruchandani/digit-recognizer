from PIL import Image
from scipy import misc
import numpy as np

#image = misc.imread('test.png')
#print image		#print image array
#print image.shape	#print image shape
#print image[0][0]	#print first image first pixel
#print image.shape[0]
#print len(image)
'''
def average(pixel):
    return ( (pixel[0] + pixel [1] + pixel[2])/3 )
'''

output = open("output3.csv","w")

def convertImage(filepath):
    basewidth = 28
    hsize = 28
    image_file = Image.open(filepath)
    image_file= image_file.convert('1') # convert image to monochrome - this works
    image_file = image_file.resize((basewidth,hsize), Image.ANTIALIAS)
    pix_val = list(image_file.getdata())
    #pix_val = image_file.getdata()
    #pix_val_flat = [x for sets in pix_val for x in sets]
   # print (pix_val)
    return pix_val

pixels = convertImage("3.png")
'''
#foo = Image.open("9_28x28.png")
#foo = foo.resize((28,28),Image.ANTIALIAS)
#foo.save("test3.png",optimize=True,quality=95)
#print foo
#foo = foo.getdata()
#print foo.shape
#print foo[0][0]
#testpng = misc.imread('test.png')
#np.invert(testpng)

#foo = misc.imread('test3.png')
#foo = foo.convert('1')

#img = Image.open('9_28x28.png')
#imgBlack = img.convert('L')
#imgBlack.save('testBinary.png')

#imgBlack = Image.open('testBinary.png')
'''
for i in range(0,784):
    output.write("pixel%d" % i)
    output.write(",")
output.write("\n")

for x in pixels:
    print "%d" % (255-x)
    #output.write("pixel%d" % (255-x) )
    output.write(str(x))
    output.write(",")

output.close()
#misc.imsave('test2.png',grey)


