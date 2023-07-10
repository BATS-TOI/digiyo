//SPDX-License-Identifier: MIT
import NonFungibleToken from 0x1d7e57aa55817448
import Digiyo from 0xae3baa0d314e546b

// This transaction transfers a number of instances to a recipient

// Parameters
//
// recipientAddress: the Flow address who will receive the NFTs
// instanceIDs: an array of instance IDs of NFTs that recipient will receive
//, instanceIDs: [UInt64]
transaction(recipientAddress: Address) {

    let transferTokens: @NonFungibleToken.Collection
    let instanceIDs: [UInt64]
    prepare(acct: AuthAccount) {
        //let collectionRef = acct.getCapability(Digiyo.collectionPublicPath)
        //                    .borrow<&{Digiyo.DigiyoNFTCollectionPublic}>()!
        //collectionRef.getIDs()
        self.instanceIDs = [578, 662, 622, 541, 363, 211, 206, 535, 683, 392, 48, 205, 707, 605, 459, 670, 412, 65, 56, 563, 631, 416, 461, 642, 641, 706, 395, 474, 565, 213, 680, 370, 540, 431, 577, 594, 760, 429, 758, 447, 398, 409, 764, 411, 373, 458, 550, 216, 754, 43, 543, 464, 635, 756, 684, 451, 390, 457, 456, 692, 671, 232, 224, 413, 604, 665, 375, 68, 625, 71, 682, 667, 589, 685, 601, 387, 621, 455, 530, 704, 236, 424, 648, 219, 542, 634, 718, 377, 600, 712, 655, 649, 757, 537, 765, 23, 694, 661, 607, 82, 469, 638, 80, 619, 210, 240, 613, 562, 676, 579, 436, 63, 547, 687, 472, 379, 222, 602, 632, 238, 468, 544, 546, 660, 529, 675, 49, 212, 204, 761, 691, 606, 460, 417, 217, 372, 650, 463, 580, 531, 584, 762, 443, 403, 368, 241, 679, 69, 528, 215, 715, 425, 208, 75, 668, 559, 636, 470, 51, 583, 389, 608, 656, 233, 596, 385, 556, 538, 658, 7, 76, 72, 637, 666, 527, 690, 567, 382, 386, 50, 623, 643, 588, 548, 207, 678, 434, 710, 423, 533, 549, 81, 420, 709, 575, 369, 717, 703, 437, 599, 768, 539, 209, 430, 714, 702, 406, 445, 713, 54, 59, 466, 628, 228, 388, 391, 366, 402, 564]
        self.transferTokens <- acct.borrow<&Digiyo.Collection>(from: Digiyo.collectionStoragePath)!.batchWithdraw(ids: self.instanceIDs)
    }

    execute {
        
        // get the recipient's public account object
        let recipient = getAccount(recipientAddress)

        // get the Collection reference for the receiver
        let receiverRef = recipient.getCapability(Digiyo.collectionPublicPath).borrow<&{Digiyo.DigiyoNFTCollectionPublic}>()
            ?? panic("Could not borrow a reference to the recipients instance receiver")

        // deposit the NFT in the receivers collection
        receiverRef.batchDeposit(tokens: <-self.transferTokens)
    }
}