import csv, random, string


# data generation settings

numdatapts = 50000

colors = ["Cadet Blue","Dark Orchid","Teal","Silver","Steel Blue","Deep Pink","Medium Blue","Olive Drab","Beige","Light Grey"]
maxnum = 100 
namelen = 10

def randomword(length):
   return ''.join(random.choice(string.lowercase) for i in range(length))

with open('gendata.csv', 'wb') as csvfile:
    writer = csv.writer(csvfile)
    #writer.writerow(["person", "color", "number"])
    writer.writerow(["person", "number"])

    for i in range(0,numdatapts):
        name = randomword(namelen)
        #color = random.choice(colors)
        num = random.randint(0, maxnum)
        #writer.writerow([name, color, num]) 
        writer.writerow([name, num]) 
        
