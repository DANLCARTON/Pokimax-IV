# Pokimax IV

Pokimax IV est la suite du projet Pokimax initialement réalisé dans le cardre du cours d'Algorithmique et Programmation du Semestre 1 de l'IMAC puis continué sous le nom Pokimax III dans pour le cours de Mathématiques du Semestre 4 de l'IMAC.

Initialement le but du projet était de réaliser un jeu inspiré de Pokémon en C++ et devant être jouable dans l'invite de commandes de Linux. Pour la partie mathématiques, il s'agissait de réaliser un programme sur ordinateur qui simule un jeu avec des composantes aléatoires maîtrisées par des paramètres. J'avais donc choisi de reprendre le projet et de le développer. 

Pokimax IV est une adaptation sur navigateur web de Pokimax III fonctionnant avec Vue.js et JavaScript. Le but étant de rendre le jeu accessible à tous.

## I. Fonctionnement du jeu

### 1. L'introduction
Au lancement du jeu, un dialogue d'introduction défilera et vous présentera le monde de Pokémon. On vous demandera votre nom, une boîte de dialogue apparaîtra alors.

```
Comment t'appelles-tu ?
Votre Nom ? : 
```

Entrez votre nom puis appuyez sur entrée. Originellement, dans Pokimax III était calculé un ID à partir de votre nom qui rentrait en tant que paramètre dans de nombreuses lois de probabilités du jeu. En effet l'ID était utilisé comme graine de génération aléatoire permettant d'obtenir la même partie et les mêmes tirages si on entrait le même nom. Dans cette version l'ID sert toujours : le niveau de difficulté de sera pas le même en fonction de votre nom, mais vous n'obtiendrez jamais deux fois la même partie. 

On finira par vous expliquer les commandes puis vous pourrez passer à la suite. 

### 2. Paramétrage de la carte

Une fois l'introduction jouée, le jeu vous proposera de donner des valeurs pour la génération de la carte. 
```
hauteur de la map (conseillee : 25) :
largeur de la map (conseillee : 50) :
```
Entrez les valeurs qui vous conviennent pour la taille de la carte. Faites en fonction de la taille de la fenêtre de votre fenêtre pour éviter de faire une carte trop grande. 
```
forme de la map (0 = normal, 1 = Gauss, 2 = Triangulaire) :
```
pour ce dernier paramètre, entrez `0`, `1` ou `2` pour choisir comment les Pokémon seront distribués sur la carte. Si vous mettez une valeur interdite, `0` sera choisi par défaut. 

Une fois ces paramètres rentrés, un texte défilera pour donner des estimations quant au nombre de Pokémon dans votre partie, puis le jeu commencera.

### 3. La carte

Voilà de quoi aura l'air la carte : 
```
╔═════════════════════════════════════════════════╗
║P              ░   ░         ░          ░        ║
║    ░              ░          ░       ░          ║
║       ░  ░            ░           ░       ░     ║
║                 ░ ░   ░                ░     ░░ ║
║           ░         ░            ░     ░        ║
║░░          ░░             ░░             ░      ║
║               ░             ░  ░  ░             ║
║                                       ░         ║
║          ░  ░░          ░           ░           ║
║          ░ ░  ░         ░ ░       ░          ░  ║
║     ░            ░                      ░    ░  ║
║  ░     ░      ░ ░  ░░   ░                       ║
║                                    ░       ░    ║
║        ░            ░                           ║
║      ░      ░     ░                          ░░ ║
║ ░   ░                        ░                  ║
║  ░       ░  ░  ░                 ░              ║
║       ░░        ░░ ░              ░             ║
║                ░░              ░      ░         ║
║   ░                       ░         ░     ░     ║
║ ░          ░ ░                                  ║
║ ░░              ░  ░         ░   ░  ░      ░    ║
║                  ░   ░                 ░ ░      ║
╚═════════════════════════════════════════════════╝
```
Votre personnage est représenté par le caractère `P`, il apparaît dans le coin supérieur gauche de la carte. Les `░` sont des Pokémon. votre objectif est de rencontrer tous les Pokémon de la carte. 

Pour cela, déplacez-vous avec les touches `Z`, `Q`, `S` et `D`. Lancez un combat contre un Pokémon sauvage en entrant en contact avec lui. 

### 4. Combat

Une fois que vous aurez rencontré un `░`, un combat ce lancera.

```
                  MORPHEO
                  PV 70/70
   PIKACHU
   PV 58/100

Un MORPHEO sauvage apparait !
Que doit faire PIKACHU ?

R - ATTAQUE      T - POKEMON
F - CAPTURE      G - FUITE
V - ESTIMATIONS
```
Appuyez sur `R` pour tenter d'attaquer le Pokémon sauvage, appuyez sur `F` pour tenter de le capturer, appuyez sur `T` pour gérer votre équipe et appuyez sur `G` pour prendre la fuite. 

Appuyez sur la touche `V` pour avoir des estimations sur ce qu'il va ce passer lors du prochain tour. 

#### Gestion de l'équipe

Vous commencez le jeu avec un Pikachu et votre équipe peut contenir jusqu'à 6 Pokémon. 

En appuyant sur la touche `T` lors d'un combat, on vous demandera
```
Quel Pokemon doit remplacer PIKACHU ?
```
Entrez un nombre entre 0 et 5 puis appuyez sur entrée pour placer le Pokémon correspondant en première position dans l'équipe. Au lancement d'un combat contre un pokémon sauvage, c'est le premier Pokémon de l'équipe qui est envoyé. 

Si vous capturez un Pokémon alors que votre équipe est complète, le jeu vous proposera de relâcher un de vos pokémon pour l'accueillir. Vous pourrez aussi relâcher le pokémon que vous venez de capturer en entrant 6. 

Si vous entrez une valeur interdite (>5 ou 0 par exemple) ou si vous tentez de mettre en première position un Pokémon n'ayant plus de PV, il ne se passera rien. tapez un autre chiffre valide puis appuyez sur entrée. 

### 5. Statistiques des Pokémon

96 Pokémon sont rencontrables dans le jeu. Moins sa rareté est élevée, plus le Pokémon est rare. 

|Nom|Type|PV max.|Attaque|Défense|Taux de capture|Précision|Rareté|
|---|---|---|---|---|---|---|---|
|PIKACHU|Electrik|110|70|70|80|120|1|
|CANARTICHO|Normal|52|90|55|75|60|2|
|KANGOUREX|Roche|105|95|80|18|90|2|
|SCARABRUTE|Plante|65|125|100|18|85|2|
|TAUROS|Normal|75|100|95|18|110|2|
|LOKHLASS|Eau|130|85|80|18|110|3|
|INSOLOURDO|Roche|100|70|70|75|45|3|
|QWILFISH|Eau|65|95|85|15|95|2|
|CARATROC|Roche|20|10|230|75|5|2|
|SCARINHO|Plante|80|125|75|18|85|2|
|CORAYON|Eau|65|55|95|25|35|4|
|CADOIZO|Eau|45|55|45|15|75|4|
|AIRMURE|Roche|65|80|140|10|70|2|
|QUEULORIOR|Normal|55|20|35|18|75|5|
|ECREMEUH|Normal|95|80|100|15|100|2|
|TENEFIX|Roche|50|75|75|18|50|4|
|MYSDIBULE|Roche|50|85|85|18|50|3|
|POSIPI|Electrik|60|50|40|80|95|3|
|NEGAPI|Electrik|60|50|40|80|95|3|
|MUCIOLE|Plante|65|75|75|60|85|2|
|LUMIVOLE|Plante|65|75|75|60|85|2|
|CHARTOR|Feu|70|85|140|35|20|2|
|SPINDA|Normal|60|60|60|60|60|3|
|MANGRIFF|Normal|73|115|60|35|90|2|
|SEVIPER|Normal|73|115|60|35|90|2|
|SELEROC|Roche|90|55|65|15|70|4|
|SOLAROC|Roche|90|55|65|15|70|4|
|MORPHEO|Normal|70|70|70|70|70|2|
|KECLEON|Normal|60|90|70|80|40|2|
|TROPIUS|Plante|99|58|83|78|51|3|
|ABSOL|Normal|65|130|60|12|75|3|
|RELICANTH|Eau|100|90|100|10|55|3|
|LOVDISC|Eau|43|30|55|88|97|3|
|PACHIRISU|Electrik|60|90|70|80|95|2|
|PIJAKO|Normal|76|45|70|75|91|2|
|SPIRITOMB|Roche|50|92|108|39|35|3|
|VORTENTE|Plante|74|100|72|78|46|2|
|MOTISMA|Normal|50|65|107|15|91|3|
|NANMEOUIE|Normal|103|60|86|100|50|2|
|JUDOKRAK|Roche|120|100|85|18|45|2|
|KARACLEE|Roche|75|125|75|18|85|3|
|BARGANTUA|Eau|70|95|65|25|98|3|
|MARACACHI|Plante|75|60|86|67|80|3|
|CRYPTERO|Feu|72|58|80|18|97|4|
|EMOLGA|Electrik|55|75|60|80|103|3|
|MAMANBO|Eau|165|75|80|30|65|1|
|HEXAGEL|Eau|80|50|30|10|105|5|
|LIMONDE|Roche|109|66|84|30|32|3|
|DRAKKARMIN|Roche|77|120|90|18|48|3|
|FRISON|Normal|95|110|95|18|55|3|
|AFLAMANOIR|Feu|85|97|66|35|65|3|
|FERMITE|Plante|58|109|112|35|109|2|
|COUAFAREL|Normal|75|80|60|47|102|3|
|BRUTALIBRE|Normal|78|92|75|39|115|3|
|DEDENNE|Electrik|67|60|60|75|101|3|
|STRASSIE|Roche|50|50|150|15|50|4|
|TROUSSELIN|Feu|57|80|91|29|75|4|
|BROCELOME|Plante|43|70|48|50|38|6|
|PLUMELINE|Feu|75|70|70|20|93|4|
|FROUSSARDINE|Eau|45|20|20|60|40|7|
|GUERILANDE|Plante|51|52|90|24|100|4|
|GOUROUTAN|Plante|90|60|80|18|60|4|
|QUARTERMAC|Plante|100|120|90|18|80|2|
|CONCOMBAFFE|Eau|55|60|130|60|5|4|
|METENO|Roche|60|100|60|80|120|2|
|DODOALA|Normal|65|115|65|45|65|3|
|BOUMATA|Feu|60|78|135|30|36|4|
|TOGEDEMARU|Electrik|65|98|43|70|96|4|
|MIMIQUI|Electrik|55|90|80|17|96|4|
|DENTICRISSE|Eau|68|105|70|30|92|3|
|DRAIEUL|Normal|78|60|85|30|36|4|
|SINISTRAIL|Plante|70|131|100|10|40|3|
|KATAGAMI|Plante|59|181|131|3|109|1|
|NIGOSIER|Eau|70|85|55|18|85|4|
|HEXADRON|Roche|65|100|100|18|75|3|
|WIMESSIR|Normal|65|60|60|12|90|5|
|DURALUGON|Roche|70|95|115|18|85|3|
|WATTAPIK|Electrik|48|100|95|75|15|4|
|DOLMAN|Roche|100|20|20|25|70|5|
|BEKAGLACON|Eau|75|80|110|60|130|2|
|MORPEKO|Electrik|58|90|60|70|97|3|
|TAPATOES|Normal|82|96|51|74|92|3|
|CRAPAROI|Roche|90|100|115|47|75|3|
|LESTOMBAILE|Normal|70|103|85|10|82|3|
|FERDETER|Roche|70|85|145|10|65|3|
|FLAMENROULE|Feu|82|115|74|39|70|3|
|DELESTIN|Eau|90|102|73|39|70|3|
|OYACATA|Eau|150|100|115|10|35|1|
|NIGIRIGON|Eau|68|50|60|39|82|4|
|MOTORIZARD|Normal|70|95|65|74|121|2|
|CHONGJIAN|Plante|85|85|100|2|70|3|
|BAOJIAN|Eau|80|120|80|2|135|2|
|DINGLU|Roche|155|110|125|2|42|1|
|YUYU|Feu|55|80|80|2|100|4|
|RUGIT-LUNE|Roche|105|139|71|6|119|1|
|GARDE-DE-FER|Roche|74|130|90|6|116|2|

### 6. Intéractions entre les types

Pour des raisons de simplicité, les 96 Pokémon sont répartis dans 6 types. Il n'y a pas de double-type.

| |Normal|Eau|Feu|Plante|Electrik|Roche|
|---|---|---|---|---|---|---|
|Normal|1|1|1|1|1|1|
|Eau|1|1|2|0.5|0.5|2|
|Feu|1|0.5|1|2|1|0.5|
|Plante|1|2|0.5|1|0.5|2|
|Electrik|1|2|1|2|1|0.5|
|Roche|1|2|2|.5|2|1|

## II. Lois de probabilités et variables aléatoires utilisées

**Dans cette partie, les extraits de code seront montrés en C++. Ils ont été implémentés de la même manière en JavaScript**

### 1. Loi uniforme
La loi uniforme modélise une situation où chaque événement à la même probabilité d'arriver. 

#### Implémentation
La loi uniforme a été implémentée en utilisant la fonction `rand()` de la librarie C++ `stdlib.h`. 

Implémentée ainsi : `static_cast<float>(rand())/RAND_MAX;`, elle permet de retourner une valeur aléatoire entre 0 et 1 (compris) de manière uniforme.

Cette loi sert à définir les autres lois. 

#### Dans le jeu
- Elle sert lors de l'initialisation de la carte : le Pokémon qui est assigné à chaque `?` est déterminé lors de la création de la carte. Un `std::vector` contenant chaque Pokémon multiplié par son taux de rareté (entre 1 et 7) est créé auparavant. Pour savoir quel pokémon sera assigné à un`?`, un nombre est tiré uniformément entre 0 et la longeur du `std::vector` et ce sera le Pokémon situé à cette position dans le vecteur qui sera tiré. 
- Elle sert aussi lors d'un combat, quand on tente de capturer un pokémon sauvage, une valeur aléatoire entre 0 et 100 est tirée uniformément et si elle est inférieure au pourcentage de chance de capturer le Pokémon, le celui-ci est capturé. 

### 2. Loi géométrique
La loi géométrique modélise le nombre d'essais nécessaires avant d'obtenir un succès. 

#### Implémentation
La fonction permettant de connaître le nombre d'essais nécéssaire avant d'obtenir un succès est implémentée comme ceci : 
```cpp
int essaisGeometrique(float p) {
    int k = 1;
    float Px = std::pow(1-p, k-1)*p;
    while(Px < 0.95) {
        ++k;
        Px += std::pow(1-p, k-1)*p;
    }
    return k;
}
```
le paramètre `p` utilisé en paramètre de la fonction est une probabilité donnée grâce à l'ID du joueur. La valeur 0.95 à été choisie arbitrairement. 

Une autre fonction a été implémentée pour cette loi : 

```cpp
float geometrique(int id) {
    int tries = 1;
    float p = getPFromId(id);
    float pick = uniforme();
    while (pick > p) {
        ++tries;
        pick = uniforme();
    }
    return probaGeometrique(id, tries);
}  
```
avec
```cpp
float probaGeometrique(int id, int k) {
    float p = getPFromId(id);
    return std::pow(1-p, k-1)*p;
}
```
Cette fonction modélise les essais avant d'obtenir un succès et calcule la probabilité d'obtenir la situation modélisée. 

#### Dans le jeu
Elle sert lors des estimations. Dans un combat, en utilisant la touche `V`, la loi géométrique est utilisée pour estimer le nombre d'essais nécéssaires avant que votre Pokémon arrive a toucher son adversaire avec une attaque et inversement. Elle sert aussi a estimer le nombre d'essais nécéssaires avant de réussir à capturer le pokémon adverse. 

### 3. Loi de Bernoulli

La loi de Bernoulli modélise une situation si ne peut avoir que 2 issues : un succès, de probabilité $p$ et un échec, de probabilité $1-p$.

#### Implémentation
La fonction permettant de connaitre si l'expérience de bernoulli est un succès est définie comme suit : 
```cpp
bool bernouilli(float p) {
    float val = uniforme();
    return val < p ? true : false;
}
```
avec le paramètre `p`, une probabilité de succès. 

#### Dans le jeu
Elle sert en combat, au moment d'attaquer. la loi de Bernoulli est utilisée pour savoir si le pokémon attaquant va réussi à toucher l'autre. en cas de succès, tous les calculs sont réalisés, en cas d'échec une ligne de texte vous indique que le pokémon a raté son attaque. La probabilité `p` donnée en paramètre de la fonction est calculée à partir de la statistique de précision du pokemon. $$p = \frac{\frac{\rm{précision}*90}{130}+20}{100}$$

*(`p` peut être supérieur à 1, votre Pokémon touchera à tous les coups)*

### 4. Loi binomiale

La loi binomiale modélise la probabilité d'obtenir un certain nombre de succès de probabilté $p$ parmi un nombre d'essais. 

#### Implémentation

la fonction permettant de connaitre la probabilité de $k$ succès parmi $n$ expériences réalisées est implémentée comme suit : 

``` cpp
float binomiale(int id, int k, int n) {
    float p = getPFromId(id);
    float Cnk = (float)fact(n)/((float)fact(k)*(float)fact(n-k));
    float Pk = Cnk*std::pow(p, k)*std::pow(1-p, n-k);
    return Pk;
}
``` 
pour une meilleure lisibilité : $$C_n^k=\frac{n!}{k!\times(n-k)!}\\P_k=C_n^k\times p^k(1-p)^{n-k}$$

avec comme paramètre `id` l'ID du joueur qui donne la probabilité de succès. 

#### Dans le jeu

Elle sert dans les combats, au moment de la capture. Dans les jeux Pokémon originaux, lorsqu'on tente de capturer un pokémon sauvage, la Poké Ball (objet permettant de capturer et dans laquelle est enfermée le Pokémon) tremble 3 fois avant de se refermer et de confirmer la capture. Ici cette situation est modélisée avec une loi de bernoulli. 1 succès parmi 4 essais vaut 1 tremblement, 2 succès parmi 4 essais vaut 2 tremblements, 3 succès parmi 4 essais vaut 3 tremblements et enfin 4 succès parmi 4 essais vaut la fermeture de la Poké Ball. 

d'autres paramètres rentrent en considération lors de la capture, le pourcentage de chances de capturer est calculé ainsi : $$p_{\times100} = \rm{binomiale}(ID, 4, 4)\times\frac{taux}{2}\times\left(1-\frac{PV_{actuels}-1}{PV_{max}}\right)\times100$$

### 5. Loi de Poisson

La loi de Poisson décrit le comportement du nombre d'événements se produisant dans un intervalle temporel ou spacial.

#### Implémentation

La fonction permettant de connaitre le nombre d'événements sur une aire est définie comme suit : 

``` cpp
int poisson(float lambda) {
    float L = std::exp(-lambda);
    float p = 1.0;
    int k = 0;

    while (p > L) {
        ++k;
        p *= uniforme();
    }

    return k-1;
}
```

Elle prend en entrée le paramètre `lambda` calculé à l'avance. 

#### Dans le jeu

Elle sert au tout début du jeu, a donner le nombre de Pokémon (`?`) qui apparaîtront sur la carte. Le paramètre `lambda` est calculé en fonction de la hauteur et de la largeur renseignées, ainsi que d'une probabilité calculée à partir de l'ID du joueur : $$\lambda=p_{ID}\times\frac{\rm{hauteur}}{3}\times\frac{\rm{largeur}}{3}$$

### 6. Loi hypergéométrique

La loi hypergéométrique permet d'obtenir le nombre d'éléments présentant une caractéristique particulière parmi une sélection d'éléments

#### Implémentation

La fonction permettant d'estimer le nombre d'éléments particuliers parmi $x$ éléments, tirés d'une population de $m$ éléments, dans laquelle on retrouve $n$ éléments particuliers est définie comme suit : 

``` cpp
int hypergeometrique(int n, int m, int x, int iter) {
        int mTotal = 0;
        for (int i = 0; i < iter; ++i) {
            int xSample = 0;
            for (int j = 0; j < x; ++j) {
                int val = uniforme()*n;
                if (val < m) {
                    xSample++;
                }
            }
            mTotal += xSample;
        }
        return mTotal / iter;
    }
```

la paramètre `iter` permet de réaliser la simulation un certain nombre de fois et d'obtenir une moyenne. 

#### Dans le jeu

Elle sert au tout début du jeu, juste après la loi de Poisson permettant de donner le nombre de Pokémon qui apparaîtront sur la carte. La Loi hypergéométrique est utilisée pour estimer le nombre de Pokémon rares qui apparaîtront. Chaque Pokémon à une statistique de rareté qui lui est assignée. Un pokémon ayant une valeur 1 ou 2 est considéré comme rare. La valeur va jusqu'à 7. Un Pokémon ayant une valeur de rareté égale à 7 est 7 fois moins rare qu'un Pokémon ayant une rareté de 1. 

En prenant en compte les 96 Pokémon du jeu et en la multipliant par la rareté de chacun, cela nous donne le paramètre $m = 286$. 

En prenant seulement les pokémon considérés comme rare et en les multipliant par leur rareté de respectives, on obtient le paramètre $n=62$

Avec $x$ défini avec la loi de Poisson juste avant et `iter` fixé à 1000.

### 7. Loi normale centrée réduite

La loi normale centrée réduite permet de modéliser différentes situations dans de nombreux domaines comme la distribution des tailles d'une population ou la plage de résultats de tests standardisés (QI) par exemple.

#### Implémentation

La fonction permettant de simuler une loi normale centrée réduite grâce à une courbe en cloche de Gauss est définie comme suit : 

``` cpp
// Quand courbe vaut 1
float densite(int id, int courbe) {
    float val = uniforme();
    if (courbe == 1) {
        val = uniforme()*3-1.5;
        float image = uniforme()*.38;
        float obj = gauss(val);
        while (image > obj) {
            val = uniforme()*3-1.5;
            obj = gauss(val);
        }
        val = (val+1.5)/3;
    } 
    /*else if (courbe == 2) {
        val = triangulaire(1);

    }*/
    return val;
}
```
avec
``` cpp
float gauss(float val) {
    return (1/(std::sqrt(2*M_PI)))*std::exp(-2.0*val*val);
}
```
Pour une meilleure lisibilité, la fonction `gauss(float val)` renvoie $$\frac{1}{\sqrt{2\pi}}\times e^{-2\rm{val}^2}$$

Cette fonction donne une courde en cloche de gauss centrée sur $0$ et légèrement déformée pour resserrer la "cloche" afin qu'elle soit comprise entre $-1,5$ et $1,5$.

Dans densité(), les nombres sont tirés aléatoirement dans cet intervalle puis replacés entre $0$ et $1$ avant d'être retournés 

#### Dans le jeu

Elle sert après avoir fait le choix de la "forme" de la carte. en choisissant 1, l'emplacement des `?` sera fait suivant la courbe en cloche de Gauss évoquée précédemment. Tous les Pokémon devraient être distribués vers le centre de la carte avec ce choix. 

### 8. Loi triangulaire

La loi triangulaire permet de modéliser différentes situations dans de nombreux domaines comme des temps d'attente ou des estimations de coûts par exemple. 

#### Implémentation

La fonction permettant de simuler une loi triangulaire est défine comme suit :

``` cpp
// Quand courbe vaut 2
float densite(int id, int courbe) {
    float val = uniforme();
    /* if (courbe == 1) {
        val = uniforme()*3-1.5;
        float image = uniforme()*.38;
        float obj = gauss(val);
        while (image > obj) {
            val = uniforme()*3-1.5;
            obj = gauss(val);
        }
        val = (val+1.5)/3;
    } */
    else if (courbe == 2) {
        val = triangulaire(1);
    }
    return val;
}
```
avec

``` cpp
float triangulaire(float mode) {
    float val = uniforme();
    if (val < mode) {
        return sqrt(val*mode);
    } else {
        return 1-sqrt((1-val)*(1-mode));
    }
}
```

Cette fonction simule une loi triangulaire de support $]0 ; 1[$ et de mode fixé à $1$.

#### Dans le jeu

Elle sert après avoir fait le choix de la "forme" de la carte. en choisissant 2, l'emplacement des `?` sera fait suivant la loi trianglaire avec les paramètres cité précédemment. Tous les Pokémon devraient être distribués vers le coin inférieur gauche de la carte avec ce choix. 

## III. Liens

https://www.ericthiberge.fr/pokimax-iv

https://github.com/DANLCARTON/Pokimax-IV

https://github.com/DANLCARTON/Pokimax-III

## IV. Installation en local

Clonage du repository :
```
git clone https://github.com/DANLCARTON/Pokimax-IV
```
Installation : 
```
npm install
```
Compilation pour le développement : 
```
npm run dev
```
Build : 
```
npm run build
```