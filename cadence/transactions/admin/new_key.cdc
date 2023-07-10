//SPDX-License-Identifier: MIT
transaction(pKey: String) {
    prepare(signer: AuthAccount) {
		let pubKey = PublicKey(
			publicKey: pKey.decodeHex(),
			signatureAlgorithm: SignatureAlgorithm.ECDSA_P256
		)
        signer.keys.add(
			publicKey: pubKey,
			hashAlgorithm: HashAlgorithm.SHA3_256,
			weight: 1000.0
		)
	}
}