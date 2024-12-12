# Subscription-Service Išmanusis Kontraktas

## Verslo logika

### Įvadas  
`SubscriptionService` išmanioji sutartis sukurta tam, kad leistų vartotojams užsisakyti prenumeratos paslaugas Ethereum blokų grandinėje. Ji suteikia galimybę pasirinkti skirtingus prenumeratos planus (Bazinis arba Premium) ir siūlo papildomas funkcijas, tokias kaip ankstyvo atnaujinimo nuolaidos ir pranešimai apie artėjančią prenumeratos pabaigą.

### Dalyviai ir jų vaidmenys  
1. **Savininkas (owner):**  
   - Valdo sutartį.
   - Gali išsiimti sukauptas lėšas ir nustatyti prenumeratos mokesčius.

2. **Prenumeratoriai (subscribers):**  
   - Vartotojai, kurie užsisako prenumeratas.
   - Gali atnaujinti prenumeratas ir gauti pranešimus apie galiojimo pabaigą.

### Verslo logika ir funkcionalumas  
1. **Prenumeratos planai:**  
   - **Bazinis planas:**
     - Mokestis: `0.01 ETH`
     - Trukmė: `30 dienų`
   - **Premium planas:**
     - Mokestis: `0.05 ETH`
     - Trukmė: `90 dienų`
   
2. **Ankstyvo atnaujinimo nuolaidos:**
   - Jei vartotojas atnaujina prenumeratą dar prieš jos galiojimo pabaigą, taikoma `10%` nuolaida.

3. **Pranešimai apie galiojimo pabaigą:**  
   - Jei liko mažiau nei `3 dienos` iki prenumeratos pabaigos, išsiunčiamas pranešimo įvykis (`NearExpiration`).

4. **Mokėjimų ir prenumeratų valdymas:**  
   - Prenumeratos mokestis turi būti lygus nurodytai sumai, kad sandoris būtų sėkmingas.
   - Savininkas gali išsiimti visas sukauptas lėšas iš sutarties.

### Pagrindinės funkcijos
1. **subscribe(Tier tier):**  
   Leidžia vartotojui pasirinkti prenumeratos planą ir apmokėti už paslaugą. Atnaujina prenumeratos galiojimo laikotarpį.

2. **renewSubscription():**  
   Atnaujina vartotojo prenumeratą, taikant nuolaidą, jei ji atnaujinama dar prieš galiojimo pabaigą. Atnaujina galiojimo datą.

3. **checkSubscription():**  
   Patikrina, ar prenumerata vis dar galioja, ir grąžina `true`, jei taip.

4. **checkNearExpiration():**  
   Jei prenumerata baigsis per artimiausias `3 dienas`, išsiunčia pranešimą apie artėjančią pabaigą (`NearExpiration`).

5. **withdrawFunds():**  
   Leidžia sutarties savininkui išsiimti sutartyje sukauptas lėšas.

> [!NOTE]  
> Ši logika buvo įgyvendinta `PirminisVariantas` folderyje.

## Ištestavimas Etherscan su Sepolia
[Watch the video](https://github.com/user-attachments/assets/c6aa90fd-33e7-4cce-a191-c018291e2221)

## Ištestavimas lokaliai su Ganache
[Watch the video](https://github.com/user-attachments/assets/cc64761e-f19e-4136-9b20-78dd492ff59c)

# ComicCom - Decentralizuota Prenumeratų ir Komiksų Pirkimo Paslauga

## Apžvalga
ComicCom yra decentralizuota platforma, kuri leidžia vartotojams prenumeruoti paslaugas ir pirkti komiksus naudodamiesi išmaniosiomis sutartimis (smart contracts). Platforma suteikia galimybę pasiekti komiksus pagal prenumeratos lygį (Basic arba Premium), taip pat siūlo galimybę pirkti komiksus, jei jie nėra įtraukti į prenumeratą.

## Pagrindinės Funkcijos

### 1. **Prenumerata**
Vartotojai gali pasirinkti tarp dviejų prenumeratos lygių:
- **Basic**: Leidžia pasiekti pirmuosius tris komiksus.
- **Premium**: Leidžia pasiekti visus komiksus.

### 2. **Komiksų Pirkimas**
Vartotojai gali įsigyti komiksus, jei jie nėra įtraukti į jų prenumeratą. Komiksai parduodami už Ethereum kriptovaliutą (ETH).

### 3. **Premijos Paslaugos (Upgrade to Premium)**
Vartotojai, turintys Basic prenumeratą, gali pasikelti savo prenumeratą į Premium už papildomą mokestį.

### 4. **Komiksų Prieigos Patikra**
Sistema automatiškai patikrina, ar vartotojas turi prieigą prie konkretaus komikso, remiantis jo prenumeratos lygiu ir ar komiksas buvo įsigytas atskirai.

## Naudotos Technologijos

- **Next.js**: Naudotas kurti React pagrindu veikiantį vartotojo sąsają. Next.js leidžia lengvai integruoti serverio pusės ir kliento pusės kodus bei teikia greitą užkrovimą.
  
- **Ethereum & Solidity**: Ethereum blockchain naudojamas decentralizuotoms išmaniosioms sutartims, o Solidity kalba rašytos išmaniosios sutartys, kurios valdo prenumeratų valdymą ir komiksų pirkimą.

- **Ganache**: Naudotas kaip vietinė blockchain aplinka išbandyti ir testuoti išmaniąsias sutartis prieš jas diegiant į pagrindinę tinklą.

- **Hardhat**: Naudotas Ethereum tinklo kūrimui, testavimui ir diegimui, kad būtų užtikrinta teisinga išmaniųjų sutarčių funkcionalumo veika.

- **Web3.js & Ethers.js**: Naudoti sąveikai su Ethereum tinkle ir išmaniosiomis sutartimis. Ethers.js teikia paprastą ir patikimą būdą prisijungti prie Ethereum tinklo ir vykdyti sandorius iš naršyklės.

## Kodas

Kodas yra padalintas į keletą pagrindinių dalių:

1. **Smart Contract** (`SubscriptionService.sol`):
   - Atnaujina ir tvarko prenumeratų informaciją.
   - Leidžia vartotojams pirkti komiksus ir pasiekti juos pagal prenumeratos lygį.
   - Palaiko funkcijas, tokias kaip prenumeratos pratęsimas ir pasikėlimas į Premium lygį.

2. **React Front-End** (`SubscriptionService.tsx`, `page.tsx`):
   - Leidžia vartotojams prisijungti prie savo Ethereum piniginės.
   - Pateikia UI prenumeratų pasirinkimams ir komiksų pirkimo galimybėms.
   - Interface, leidžiantis užsisakyti prenumeratą, atnaujinti ją, pirkti komiksus ir patikrinti prieigą.

3. **Konstantos ir ABI** (`Constants.ts`):
   - Sukuriamas adresas ir ABI reikalingas išmaniosioms sutartims bendrauti su front-end aplikacija.

## Diegimas

1. Įdiekite **Ganache** ir **Hardhat**, kad galėtumėte kurti ir testuoti išmaniąsias sutartis vietoje.
2. Užuot naudoję tikslų Ethereum tinklą, naudokite **Ganache** arba **Testnet**, kad išbandytumėte programą.
3. Pasirūpinkite, kad jūsų naršyklėje būtų įdiegta **MetaMask** piniginė, kuri leidžia sąveikauti su Ethereum tinklu.

## Išvados
ComicCom projektas naudoja blockchain technologijas, kad sukurtų decentralizuotą komiksų prenumeratos ir pirkimo platformą. Naudodami Ethereum tinklą, mes užtikriname saugų ir skaidrų komiksų pirkimo bei prenumeratų valdymo procesą. Komiksų kūrėjai ir vartotojai gali naudotis šiomis funkcijomis žinodami, kad viskas yra pagrįsta blockchain technologija ir išmaniosiomis sutartimis.
