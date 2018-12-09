#!/usr/bin/python3
def ElipticCurve(A ,B, fieldSize, testP, testQ):
	def onCurve(x,y):
		return (pow(y,2) % fieldSize) == ((pow(x,3) + A*x + B) % fieldSize)
	def printAllPoints():
		index=1;
		print("All points (x,y) on the curve:",file=f)
		print(f'{index}. O',file=f)
		for x in range(0,fieldSize):
			for y in range(0,fieldSize):
				if onCurve(x, y):
					index+=1
					print(f'{index}. ({x},{y})',file=f)
	printAllPoints()

if __name__ == "__main__":
	with open('Q2_Output.txt', 'w') as f:
		print('###  Question  2 ###',file=f)
		ElipticCurve(A=-5, B=8, fieldSize=37, testP=(6, 3), testQ=(9, 10))
		print('### End Question ###',file=f)
	f.close()
	#Prinf file to STDOUT
	print(open('Q2_Output.txt').read())