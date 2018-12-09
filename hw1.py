#!/usr/bin/python3

def randomNumberGenerator():
	return 1547

# Simple exmaple for RSA using given primes p,q and random number e
def RSA(p, q, e):
	# XGCD algorithm taken from internet
	# Given a and b s.t a > b
	# Returns (s,t) s.t a*s + b*t = gcd(a,b)
	def xgcd(a, b):
		s, old_s = 0, 1
		t, old_t = 1, 0
		r, old_r = b, a
		while r > 0:
			q = old_r // r
			(old_r, r) = (r, old_r - q * r)
			(old_s, s) = (s, old_s - q * s)
			(old_t, t) = (t, old_t - q * t)
		return (old_s,old_t)
	
	# Given a message M, private key d and public key (n ,e)
	# Returns tuple of M with signature M ** e (mod n)
	# This function doesn't use a hash function for simplicity
	def sign(M, privateKey, publicKey):
		(n, _) = publicKey
		return (M, pow(M, privateKey, n))
	
	# Given a signed message (M,signature), public key (n ,e)
	# Returns true if M == signature ** e (mod n)
	def verify(signedMessage, publicKey):
		(n ,e) = publicKey
		(M, signature) = signedMessage
		return M == pow(signature, e, n)
	
	n = p*q
	eular = (p-1)*(q-1)
	(_,d) = xgcd(eular, e)
	while d < 0:
		d = d + eular
	
	publicKey = (n ,e)
	privateKey = d
	print (f'public key: (n,e): {publicKey}')
	print (f'private key: d = {privateKey}')
	
	M = 122
	print(f'Message: {M}')
	
	signedMessage = sign(M,d,publicKey)
	print(f'Signed Message: {signedMessage}')
	
	verification = verify(signedMessage, publicKey)
	print(f'Message passed verification: {verification}')
	
def ElipticCurve(A ,B, fieldSize, testP, testQ):
	def onCurve(x,y):
		return (pow(y,2) % fieldSize) == ((pow(x,3) + A*x + B) % fieldSize)
	def printAllPoints():
		print("All points (x,y) on the curve:")
		print("O")
		for x in range(0,fieldSize):
			for y in range(0,fieldSize):
				if onCurve(x, y):
					print(f'({x},{y})')
	
	def findIntersection(Px,Qx,M,N):
		for x in range(0,fieldSize):
			if x == Px or x == Qx:
				continue
			y = M*x + N
			if onCurve(x,y):
				return (x,y)
		return "O"
	
	def addPoints(P, Q):
		if (P == "O") or (Q == "O"):
			if Q != "O":
				return P
			elif P != "O":
				return Q
			else:
				return "O"
		(Px, Py) = P
		(Qx, Qy) = Q
		
		dX = Qx - Px
		dY = Qy - Py
		if dX == 0 and dY != 0:
			return "O"
		elif dX == 0 and dY == 0:
			M = (3 * pow(Px, 2 + A)) / (2 * Py)
		else:
			M = dY / dX
		
		N = Py - M*Px
		
		intersection = findIntersection(Px, Qx, M, N)
		if intersection == "O":
			intersection = Q
		(Ix, Iy) = intersection
		
		AnsY = -1 * Iy
		while AnsY < 0:
			AnsY = AnsY + fieldSize
		return (Ix, AnsY)
		
	print("###  Part 1  ###")
	printAllPoints()
	print('### End Part ###')
	
	print("###  Part 2  ###")
	P2 = addPoints(testP,testP)
	print(f'2P: {P2}')
	P3 = addPoints(P2, testP)
	print(f'3P: {P3}')
	PQ = addPoints(testP, testQ)
	print(f'P + Q: {PQ}')
	print('### End Part ###')
	
	

if __name__ == "__main__":
	print('###  Question 1  ###')
	RSA(p=4973, q=5347, e=randomNumberGenerator())
	print('### End Question ###')
	print()
	print('###  Question 2  ###')
	ElipticCurve(A=-5 ,B=8, fieldSize=37, testP=(6,3), testQ=(9,10))
	print('### End Question ###')