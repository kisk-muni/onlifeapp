/** @jsx jsx */
import StarterLayout from 'components/StarterLayout'
import { useRouter } from 'next/router'
import htmlParser from 'react-markdown/plugins/html-parser'
import { jsx, Text, Heading, Container, Card, Donut, Link as SLink, Spinner, AspectRatio, Grid, Box, Flex } from 'theme-ui'
import { NextPage } from 'next'
import Link from 'next/link'
import { getAllPostsForGroup } from 'utils/api'
import { NextSeo } from 'next-seo'

interface Props {
  allPosts: any
}

const Index: NextPage<Props> = ({ allPosts }) => {
  return (
    <StarterLayout>
      <NextSeo noindex title={'Podmínky užívání webové aplikace ONLIFE'} />
      <Box sx={{backgroundImage: t => t.util.gx('red', 'primary'), color: 'white'}}>
        <Container sx={{py: 6, mb: 5}}>
          <Heading variant="specialtitle" sx={{color: 'background'}}>Podmínky užívání webové aplikace ONLIFE (www.onlifeapp.now.sh)</Heading>
          <Text variant="subtitle">(dále jen jako „Podmínky užívání“)</Text>
        </Container>
      </Box>
      <Container>
        
        <Heading>1. OBECNÁ USTANOVENÍ</Heading>
        <Text>
          Provozovatelem webové aplikace ONLIFE (dále jen „webová aplikace“ nebo „tato webová aplikace“) je Filozofická fakulta Masarykovy univerzity, se sídlem Arna Nováka 1/1, 602 00 Brno, IČO 00216224 (dále jen jako „Provozovatel“), která je v souladu se zák. č. 121/2000 Sb., zákon o právu autorském, o právech souvisejících s právem autorským a o změně některých zákonů (dále jen „Autorský zákon“), oprávněna vykonávat majetková práva autorská k obsahu na těchto Internetových stránkách, pokud není uvedeno jinak.
        </Text>
        <Text>
          Uživatelem webové aplikace může být každá fyzická či právnická osoba (dále jen „Uživatel“).
        </Text>
        <Text>
          Provozovatel tímto vydává Podmínky užívání této webové aplikace (dále jen „Podmínky). Tato webová aplikace je bezplatně veřejně přístupná a její užívání se řídí těmito Podmínkami užívání, které slouží k vymezení vztahu mezi Provozovatelem a Uživatelem této webové aplikace.
        </Text>
        <Text>
          Webová aplikace vznikla jako produkt aplikovaného výzkumu TA ČR Platforma pro transfer znalostí: informační gramotnost pro středoškoláky v otevřeném mash-up virtuálním učebním prostředí, realizovaném na Masarykově univerzitě. Zdrojový kód je dostupný jako open source v souladu s podmínkami projektu.
        </Text>
        <Text>
          Veškerá práva k této webové aplikaci náleží Provozovateli, tj. správa kvízů, rozvoj aplikace, práce s daty uživatelů.
        </Text>
        <Text>
          Webová aplikace pro ukládání dat uživatelů využívá služby (servery) třetích stran. Autetizaci tj. ověřování identity uživatelů a jejich správu, zajišťuje služba Auth0 (https://auth0.com). Ostatní data jsou uložena v databázi Fauna (https://fauna.com/). Tato data zahrnují veškeré ostatní informace, jako jsou průchod kurzem, výsledky kvízů a vztahy mezi uživateli.
        </Text>
        
        <Heading>2. SOUHLAS S PODMÍNKAMI UŽÍVÁNÍ</Heading>
        <Text>
          Aby Uživatel mohl používat Internetové stránky, musí nejprve vyjádřit souhlas s Podmínkami užití. Pokud s Podmínkami užití nesouhlasí, nemůže Internetové stránky používat.
        </Text>
        <Text>
          Souhlas s Podmínkami užití lze vyjádřit těmito způsoby:
        </Text>
        <Text>
          a) kliknutím na tlačítko představující souhlas a přistoupení k Podmínkám, pokud tato možnost je součástí uživatelského rozhraní Internetových stránek.
        </Text>
        <Text>
          b) tím, že začne webovou aplikaci skutečně používat. V takovém případě bere na vědomí a souhlasí s tím, že Provozovatel považuje používání webové aplikace Uživatelem za projev souhlasu s Podmínkami užívání od okamžiku, kdy je Uživatel začne skutečně užívat dle následující sekce Způsob užívání aplikace.
        </Text>
        
        <Heading>ZPŮSOB POUŽÍVÁNÍ</Heading>
        <Text>
          Webovou aplikaci je možné využívat pro registraci a přihlášení.
        </Text>
        <Text>
          V aplikaci je možné vytvořit dva typy profilů „Učitel“ a „Student“. 
        </Text>
        <Text>
          „Učitel“ v rámci aplikace tvoří „Třídy“ tj. prostor pro určitou skupinu uživatelů, typicky žáků své školy. Připojením žáků prostřednictvím kódu může učitel vyhodnocovat výsledky učení na základě prohlížení informací v „Aktivita v kurzu“ a „Výsledky kvízů“. To znamená, že jsou mu zpřístupněna data o dosažených kvízech a jejich výsledcích jednotlivých uživatelů „Student“.
        </Text>
        <Text>
          „Student“ má dvě možnosti využívání aplikace. První z nich je použití samostatné. Druhé je použití v rámci „Třídy“, které předpokládá připojení pomocí specifického kódu k „Třídě“ spravované učitelem. Student připojením ke třídě souhlasí s tím, že učitel přistupuje k jeho datům, tj. může prohlížet informace „Aktivita v kurzu“ a „Výsledky kvízů“.
        </Text>
        <Text>
          „Aktivita v kurzu“ zahrnuje veškerá data o interakcích s webovou aplikací včetně výsledků kvízů, dat o profilu studenta (jméno, příjmení, email, způsob přihlášení).
        </Text>
        <Text>
          Uživatel a Provozovatel tímto sjednávají, že údaje vložené do webové aplikace jsou části databáze shromážděné Provozovatelem a stávají se součástí databáze Provozovatele. Uživateli tím nevzniká žádné právo k databázi. 
        </Text>
        <Text>
          Uživatel má možnost kdykoli svůj uživatelský účet zrušit kontaktování podpory kiskonline@gmail.com. Účet bude zrušen do 30 dnů. Provozovatel si vyhrazuje právo uchovat anonymizovaná data o uživatelích, tj. „Postup v kurzu“ a „Výsledky kvízů“ a využívat je pro účely výzkumu a rozvoje aplikace. 
        </Text>
        <Text>
          Provozovatel si dále vyhrazuje právo smazat uživatelské účty, které jsou využívány v rozporu s těmito Podmínkami užití, s obecně uznávanými etickými či morálními pravidly společnosti nebo s předpisy platnými na území České republiky. Provozovatel si rovněž vyhrazuje právo smazat uživatelské účty, jež narušují stabilitu a chod webové aplikace ONLIFE.
        </Text>
        
        <Heading>OMEZENÍ ODPOVĚDNOSTI PROVOZOVATELE</Heading>
        <Text>
          Provozovatel neručí za správnost a úplnost informací ve webové aplikace. Provozovatel nenese žádnou odpovědnost za jakékoliv případné škody, které Uživateli mohou vzniknout v souvislosti s užíváním webové aplikace.
        </Text>
        <Text>
          Provozovatel neověřuje pravdivost uživatelem zadaných údajů. Provozovatel dále neodpovídá za obsah sdělení, které si mezi sebou vyměňují Uživatelé některých částí webové aplikace. 
Provozovatel nenese žádnou odpovědnost za obsah internetových stránek třetích subjektů, které lze navštívit prostřednictvím jeho stránek (zejména prostřednictvím odkazů vedoucích mimo Internetové stránky).
        </Text>
        <Text>
          Provozovatel může kdykoliv bez předchozího upozornění provádět změny informací na webové aplikace, a to včetně těchto Podmínek užití.  
        </Text>
        
        <Heading>5. OCHRANA OSOBNÍCH ÚDAJŮ</Heading>
        <Text>
          Ve smyslu zákona č. 101/2000, o ochraně osobních údajů a o změně některých zákonů Uživatel souhlasí, že Poskytovatel uchovává ve své databázi údaje vložené Uživatelem. Jde zejména o: uživatelské jméno, jméno a příjmení, e-mailovou adresu a heslo. Ve svém uživatelském profilu může případně uživatel doplnit další osobní údaje, přičemž je informován o tom, které informace jsou povinné a které jsou volitelné pro užívání systému.
        </Text>
        <Text>
          Dle § 89 zákona č. 127/2005 Sb., o elektronických komunikacích informujeme, že naše služby používají pro svoji správnou činnost tzv. cookies.
        </Text>
        <Text>
          Při využívání webové aplikace ADRESA mohou být dále automaticky shromažďovány určité informace (obvykle související s návštěvností stránek či s konverzemi jednotlivých akcí v aplikaci) za použití různých technologií (Google Analytics, Fauna.com, Auth0, logování přístupů na straně serverů apod.). Provozovatel si vyhrazuje právo využívat tyto údaje pro svou vnitřní potřebu, zejména pak pro provádění analýz a vyhodnocování návštěvnosti související s fungováním stránek. Anonymizované údaje o návštěvnosti stránek a jednotlivých kurzů mohou být použity i pro výzkumné účely.
        </Text>
        <Text>
          Osobní údaje nebudou dále předávány třetím osobáms výjimkou služeb uvedených v čl. 1 odst. 5  v tomto odstavci.
        </Text>
        
        <Heading>6. ZÁVĚREČNÁ USTANOVENÍ</Heading>
        <Text>
          Tyto podmínky je oprávněn měnit či upravovat pouze Provozovatel. Provozovatel si zároveň vyhrazuje právo měnit tyto podmínky kdykoli podle vlastního uvážení, a to i bez předchozího upozornění Uživatele. Uživatel je povinen se řídit vždy aktuálním zněním těchto Podmínek užití. Jakékoli takové úpravy jsou pro Uživatele závaznéPodmínky užívání stránek jsou účinné dnem jejich zveřejnění. Uživatel je povinen se pravidelně seznamovat s případnými změnami těchto podmínek. Přístupem ke stránkám a jejich využíváním Uživatel s Podmínkami užití i jejich případnými změnami souhlasí.
        </Text>
        <Text>
          Dotazy, podněty či stížnosti týkající se podmínek těchto Internetových stránek mohou Uživatelé Provozovateli zaslat prostřednictvím kontaktů na uvedených na příslušné stránce.Jakékoliv spory vzniklé na základě Smlouvy nebo Podmínek budou rozhodovat věcně a místně příslušné soudy České republiky. 
        </Text>
      </Container>
    </StarterLayout>
  );
  
}

export default Index
