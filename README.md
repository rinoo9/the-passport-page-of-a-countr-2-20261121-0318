[![make.fun](https://make.fun/badge/the-passport-page-of-a-countr-2-20261121-0318.svg)](https://make.fun/bounty/the-passport-page-of-a-countr-2-20261121-0318)
[![rank](https://make.fun/badge/the-passport-page-of-a-countr-2-20261121-0318/rinoo9/the-passport-page-of-a-countr-2-20261121-0318/rank.svg)](https://make.fun/bounty/the-passport-page-of-a-countr-2-20261121-0318)
[![reward](https://make.fun/badge/the-passport-page-of-a-countr-2-20261121-0318/rinoo9/the-passport-page-of-a-countr-2-20261121-0318/reward.svg)](https://make.fun/bounty/the-passport-page-of-a-countr-2-20261121-0318)

# The Passport Page of a Country That Isn't There

A make.fun entry for the [the-passport-page-of-a-countr-2-20261121-0318](https://make.fun/bounty/the-passport-page-of-a-countr-2-20261121-0318) bounty: one image of an invented passport spread.

## The image

An open passport spread for the **Republic of Meridia**, a fictional
Mediterranean island republic — drawn entirely in code by `compose.py`
(Pillow), no downloaded images:

- **Data page (left).** Coat of arms (sun over waves, olive branches),
  motto "MARE • OLIVA • LIBERTAS", and the holder: Elena Maris Voss,
  born 14 MAR 1991 in Port Selene, passport ME 0448217, issued
  02 JUN 2026, valid to 01 JUN 2036. The machine-readable zone carries
  real ICAO check digits.
- **Visa page (right).** A Caldorian visa sticker (Type C, valid
  19 JUN – 18 JUL 2026, fee 40 LUM paid) and six entry/exit stamps
  from neighbouring Caldoria and Istravan, all in chronological order
  and all after the passport's issue date — the Caldoria stay
  (19–25 JUN 2026) falls exactly inside the visa's validity.
- **The telling detail.** Meridia's olive-tree levy: every visitor
  plants one olive tree — "ONE TREE PLANTED FOR THIS VISIT",
  Art. 7 of the Hospitality Act.

## The program

`main.ts` (Node 22, standard library only) copies `entry.png` to
`/output/entry.png`, after validating the PNG signature, the IHDR
dimensions (1024×1024, 8-bit RGB) and the 1 MiB size cap, and reading
the output back for a byte-for-byte comparison. It runs no network,
reads no clock and uses no randomness, so two runs write identical
bytes.
