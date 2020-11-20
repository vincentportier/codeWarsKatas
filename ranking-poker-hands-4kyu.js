var Result = { win: 1, loss: 2, tie: 3 };

class PokerHand {
  constructor(str) {
    this.hand = str
      .split(" ")
      .map((card) => ({ value: card.substring(0, 1), suit: card.substring(1) }))
      .map((card) => {
        switch (card.value) {
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9":
            return { value: parseInt(card.value), suit: card.suit };
            break;
          case "T":
            return { value: 10, suit: card.suit };
            break;
          case "J":
            return { value: 11, suit: card.suit };
            break;
          case "Q":
            return { value: 12, suit: card.suit };
            break;
          case "K":
            return { value: 13, suit: card.suit };
            break;
          case "A":
            return { value: 14, suit: card.suit };
            break;
          default:
            return { value: card.value, suit: card.suit };
        }
      })
      .sort((a, b) => a.value - b.value);
  }

  compareWith(Pokerhand) {
    let player = this.hand;
    let opponent = Pokerhand.hand;

    const getKickers = (hand, handValue, pairs, threeOfKind, fourOfKind) => {
      switch (handValue) {
        case 1:
          return hand.map((card) => card.value);
          break;
        case 2:
          return hand
            .filter((card) => card.value != pairs[1][0])
            .map((card) => card.value);
        case 3:
          return hand
            .filter(
              (card) => card.value !== pairs[1][0] && card.value !== pairs[1][1]
            )
            .map((card) => card.value);
          break;
        case 4:
        case 7:
          return hand
            .filter((card) => card.value !== threeOfKind[1])
            .map((card) => card.value);
          break;
        case 5:
        case 9:
          return [hand[4].value];
          break;
        case 6:
          return hand.map((card) => card.value);
          break;
        case 8:
          return hand
            .filter((card) => card.value !== fourOfKind[1])
            .map((card) => card.value);
          break;
        case 10:
          return [14];
          break;
      }
    };

    const checkPairs = (hand) => {
      let fourOfKind = [0, ""];
      let threeOfKind = [0, ""];
      let pairs = [0, []];

      for (let i = 0; i < hand.length - 1; ) {
        let value = (i) => {
          return i > 4 ? null : hand[i].value;
        };

        if (
          value(i) === value(i + 1) &&
          value(i) === value(i + 2) &&
          value(i) === value(i + 3)
        ) {
          fourOfKind[0]++;
          fourOfKind[1] = value(i);
          i += 4;
        } else if (value(i) === value(i + 1) && value(i) === value(i + 2)) {
          threeOfKind[0]++;
          threeOfKind[1] = value(i);
          i += 3;
        } else if (value(i) === value(i + 1)) {
          pairs[0]++;
          pairs[1].push(value(i));
          pairs[1].sort((a, b) => a - b);
          i += 2;
        } else i++;
      }
      return { fourOfKind, threeOfKind, pairs };
    };

    const isFlush = (hand) => {
      let suit = hand[0].suit;
      return hand.every((card) => card.suit === suit);
    };

    const isStraight = (hand) => {
      let straight = false;
      for (let i = 0; i < hand.length - 1; i++) {
        let value = hand[i].value;
        let nextValue = hand[i + 1].value;

        if (value !== nextValue - 1) {
          return (straight = false);
        }
        if (value === nextValue - 1) {
          straight = true;
        }
      }
      return straight;
    };

    const isStraightFlush = (hand) => {
      if (isStraight(hand) && isFlush(hand)) return true;
      return false;
    };

    const isRoyalFlush = (hand) => {
      if (isStraight(hand) && isFlush(hand) && hand[4] === 14) return true;
      return false;
    };

    const handValue = (hand) => {
      let h = hand;
      let pairResults = checkPairs(h);
      let fourOfKind = pairResults.fourOfKind;
      let threeOfKind = pairResults.threeOfKind;
      let pairs = pairResults.pairs;

      let handValue = isRoyalFlush(h)
        ? 10
        : isStraightFlush(h)
        ? 9
        : fourOfKind[0] === 1
        ? 8
        : threeOfKind[0] === 1 && pairs[0] === 1
        ? 7
        : isFlush(h)
        ? 6
        : isStraight(h)
        ? 5
        : threeOfKind[0] === 1
        ? 4
        : pairs[0] === 2
        ? 3
        : pairs[0] === 1
        ? 2
        : 1;

      return { handValue, fourOfKind, threeOfKind, pairs };
    };

    let playerHandValue = handValue(player);
    let opponentHandValue = handValue(opponent);

    console.log(player, opponent);

    // Player hand value
    let valueP = playerHandValue.handValue;
    let pairsP = playerHandValue.pairs;
    let threeOfKindP = playerHandValue.threeOfKind;
    let fourOfKindP = playerHandValue.fourOfKind;
    let pKickers = getKickers(
      player,
      valueP,
      pairsP,
      threeOfKindP,
      fourOfKindP
    );

    //Opponent hand value

    let valueO = opponentHandValue.handValue;
    let pairsO = opponentHandValue.pairs;
    let threeOfKindO = opponentHandValue.threeOfKind;
    let fourOfKindO = opponentHandValue.fourOfKind;
    let oKickers = getKickers(
      opponent,
      valueO,
      pairsO,
      threeOfKindO,
      fourOfKindO
    );

    if (valueP > valueO) return 1;
    if (valueP < valueO) return 2;

    if (valueP === valueO) {
      if (
        player.map((card) => card.value).reduce((a, b) => a + b) ===
        opponent.map((card) => card.value).reduce((a, b) => a + b)
      )
        return 3;

      switch (valueP) {
        case 1:
          return pKickers[4] > oKickers[4]
            ? 1
            : pKickers[4] < oKickers[4]
            ? 2
            : pKickers[3] > oKickers[3]
            ? 1
            : pKickers[3] < oKickers[3]
            ? 2
            : pKickers[2] > oKickers[2]
            ? 1
            : pKickers[2] < oKickers[2]
            ? 2
            : pKickers[1] > oKickers[1]
            ? 1
            : pKickers[1] < oKickers[1]
            ? 2
            : pKickers[0] > oKickers[0]
            ? 1
            : pKickers[0] < oKickers[0]
            ? 2
            : 3;

          break;

        case 2:
          // Highest pair wins
          if (pairsP[1][0] > pairsO[1][0]) return 1;
          if (pairsP[1][0] < pairsO[1][0]) return 2;

          // Same pair, kicker decides winner
          if (pairsP[1][0] === pairsO[1][0]) {
            return pKickers[2] > oKickers[2]
              ? 1
              : pKickers[2] < oKickers[2]
              ? 2
              : pKickers[1] > oKickers[1]
              ? 1
              : pKickers[1] < oKickers[2]
              ? 2
              : pKickers[0] > oKickers[0]
              ? 1
              : pKickers[0] < oKickers[0]
              ? 2
              : 3;
          }
          break;

        case 3:
          // highest pair wins
          if (pairsP[1][1] > pairsO[1][1]) return 1;
          if (pairsP[1][1] < pairsO[1][1]) return 2;

          // pairs are identical
          if (pairsP[1][0] === pairsO[1][0] && pairsP[1][1] === pairsO[1][1]) {
            return pKickers[0] === oKickers[0]
              ? 3
              : pKickers[0] > oKickers[0]
              ? 1
              : 2;
          }
          break;

        case 4:
          // highest threeOfKind wins
          if (threeOfKindP[1] > threeOfKindO[1]) return 1;
          if (threeOfKindP[1] < threeOfKindO[1]) return 2;
          if (threeOfKindP[1] === threeOfKindO[1]) {
            return pKickers[1] > oKickers[1]
              ? 1
              : pKickers[1] < oKickers[1]
              ? 2
              : pKickers[0] > oKickers[0]
              ? 1
              : pKickers[0] < oKickers[0]
              ? 2
              : 3;
          }
          break;

        case 5:
          // highest straight wins

          return pKickers[0] > oKickers[0] ? 1 : 2;
          break;

        case 6:
          return pKickers[4] > oKickers[4]
            ? 1
            : pKickers[4] < oKickers[4]
            ? 2
            : pKickers[3] > oKickers[3]
            ? 1
            : pKickers[3] < oKickers[3]
            ? 2
            : pKickers[2] > oKickers[2]
            ? 1
            : pKickers[2] < oKickers[2]
            ? 2
            : pKickers[1] > oKickers[1]
            ? 1
            : pKickers[1] < oKickers[1]
            ? 2
            : pKickers[0] > oKickers[0]
            ? 1
            : pKickers[0] < oKickers[0]
            ? 2
            : 3;
          break;

        case 7:
          if (threeOfKindP[1] > threeOfKindO[1]) return 1;
          if (threeOfKindP[1] < threeOfKindO[1]) return 2;
          if (threeOfKindP[1] === threeOfKindO[1]) {
            return pairsP[1][0] > pairsO[1][0]
              ? 1
              : pairsP[1][0] < pairsO[1][0]
              ? 2
              : 3;
          }

          break;

        case 8:
          if (fourOfKindP[1] > fourOfKindO[1]) return 1;
          if (fourOfKindP[1] < fourOfKindO[1]) return 2;
          if (fourOfKindP[1] === fourOfKindO[1]) {
            return pKickers[0] > oKickers[0]
              ? 1
              : pKickers[0] < oKickers[0]
              ? 2
              : 3;
          }

          break;

        case 9:
          if (pKickers[0] > oKickers[0]) return 1;
          if (pKickers[0] < oKickers[0]) return 2;

          break;

        case 10:
          return 3;
          break;
      }
    }
  }
}
