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
		return (old_s, old_t)

	# Given a message M, private key d and public key (n ,e)
	# Returns tuple of M with signature M ** e (mod n)
	# This function doesn't use a hash function for simplicity
	def sign(M, privateKey, publicKey):
		(n, _) = publicKey
		return (M, pow(M, privateKey, n))

	# Given a signed message (M,signature), public key (n ,e)
	# Returns true if M == signature ** e (mod n)
	def verify(signedMessage, publicKey):
		(n, e) = publicKey
		(M, signature) = signedMessage
		return M == pow(signature, e, n)

	n = p * q
	eular = (p - 1) * (q - 1)
	(_, d) = xgcd(eular, e)
	while d < 0:
		d = d + eular

	publicKey = (n, e)
	privateKey = d
	print(f'public key: (n,e): {publicKey}',file=f)
	print(f'private key: d = {privateKey}',file=f)

	M = 122
	print(f'Message: {M}')

	signedMessage = sign(M, d, publicKey)
	print(f'Signed Message: {signedMessage}',file=f)

	verification = verify(signedMessage, publicKey)
	print(f'Message passed verification: {verification}',file=f)
	
if __name__ == "__main__":
	with open('Q1_Output.txt', 'w') as f:
		print('###  Question 1  ###',file=f)
		RSA(p=4973, q=5347, e=randomNumberGenerator())
		print('### End Question ###',file=f)
	f.close()
	#Prinf file to STDOUT
	print(open('Q1_Output.txt').read())
