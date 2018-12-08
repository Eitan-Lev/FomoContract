#!/usr/bin/python3
def ElipticCurve(A, B, fieldSize, testP, testQ):
	def onCurve(x, y):
		return (pow(y, 2) % fieldSize) == ((pow(x, 3) + A * x + B) % fieldSize)

	def findIntersection(Px, Qx, M, N):
		for x in range(0, fieldSize):
			if x == Px or x == Qx:
				continue
			y = M * x + N
			if onCurve(x, y):
				return (x, y)
		return "O"

	def addPoints(P, Q):
		if (P == "O") or (Q == "O"):
			if Q != "O":
				return Q
			elif P != "O":
				return P
			else:
				return "O"
		(Px, Py) = P
		(Qx, Qy) = Q

		dX = Qx - Px
		dY = Qy - Py
		if dX == 0 and (dY != 0 or Py == 0 ):
			return "O"
		elif dX == 0 and dY == 0:
			M = (3 * pow(Px, 2) + A) / (2 * Py)
		else:
			M = dY / dX

		N = Py - M * Px
		#print(f'y={M}x+{N}',file=f)
		intersection = findIntersection(Px, Qx, M, N)
		if intersection == "O":
			intersection = Q
		(Ix, Iy) = intersection

		AnsY = -1 * Iy
		while AnsY < 0:
			AnsY = AnsY + fieldSize
		return (Ix, AnsY)

	P2 = addPoints(testP, testP)
	print(f'2P: {P2}',file=f)
	P3 = addPoints(P2, testP)
	print(f'3P: {P3}',file=f)
	PQ = addPoints(testP, testQ)
	print(f'P + Q: {PQ}',file=f)



if __name__ == "__main__":
	with open('Q3_Output.txt', 'w') as f:
		print('###  Question  3 ###',file=f)
		ElipticCurve(A=-5, B=8, fieldSize=37, testP=(6, 3), testQ=(9, 10))
		print('### End Question ###',file=f)
	# Prinf file to STDOUT
	print(open('Q3_Output.txt').read())