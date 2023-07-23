<template>
  <div class="about">
<h1 id="pokimax-iv">Pokimax IV</h1>
<p>Pokimax IV est la suite du projet Pokimax initialement réalisé dans le cardre du cours d&#39;Algorithmique et Programmation du Semestre 1 de l&#39;IMAC puis continué sous le nom Pokimax III dans pour le cours de Mathématiques du Semestre 4 de l&#39;IMAC.</p>
<p>Initialement le but du projet était de réaliser un jeu inspiré de Pokémon en C++ et devant être jouable dans l&#39;invite de commandes de Linux. Pour la partie mathématiques, il s&#39;agissait de réaliser un programme sur ordinateur qui simule un jeu avec des composantes aléatoires maîtrisées par des paramètres. J&#39;avais donc choisi de reprendre le projet et de le développer. </p>
<p>Pokimax IV est une adaptation sur navigateur web de Pokimax III fonctionnant avec Vue.js et JavaScript. Le but étant de rendre le jeu accessible à tous.</p>
<h2 id="i-fonctionnement-du-jeu">I. Fonctionnement du jeu</h2>
<h3 id="1-l-introduction">1. L&#39;introduction</h3>
<p>Au lancement du jeu, un dialogue d&#39;introduction défilera et vous présentera le monde de Pokémon. On vous demandera votre nom, une boîte de dialogue apparaîtra alors.</p>
<pre><code>Comment t<span class="hljs-symbol">'appelles</span>-tu ?
Votre Nom ? :
</code></pre><p>Entrez votre nom puis appuyez sur entrée. Originellement, dans Pokimax III était calculé un ID à partir de votre nom qui rentrait en tant que paramètre dans de nombreuses lois de probabilités du jeu. En effet l&#39;ID était utilisé comme graine de génération aléatoire permettant d&#39;obtenir la même partie et les mêmes tirages si on entrait le même nom. Dans cette version l&#39;ID sert toujours : le niveau de difficulté de sera pas le même en fonction de votre nom, mais vous n&#39;obtiendrez jamais deux fois la même partie. </p>
<p>On finira par vous expliquer les commandes puis vous pourrez passer à la suite. </p>
<h3 id="2-param-trage-de-la-carte">2. Paramétrage de la carte</h3>
<p>Une fois l&#39;introduction jouée, le jeu vous proposera de donner des valeurs pour la génération de la carte. </p>
<pre><code><span class="hljs-selector-tag">hauteur</span> <span class="hljs-selector-tag">de</span> <span class="hljs-selector-tag">la</span> <span class="hljs-selector-tag">map</span> (<span class="hljs-attribute">conseillee </span>: <span class="hljs-number">25</span>) :
<span class="hljs-selector-tag">largeur</span> <span class="hljs-selector-tag">de</span> <span class="hljs-selector-tag">la</span> <span class="hljs-selector-tag">map</span> (<span class="hljs-attribute">conseillee </span>: <span class="hljs-number">50</span>) :
</code></pre><p>Entrez les valeurs qui vous conviennent pour la taille de la carte. Faites en fonction de la taille de la fenêtre de votre fenêtre pour éviter de faire une carte trop grande. </p>
<pre><code>forme de <span class="hljs-keyword">la</span> <span class="hljs-keyword">map</span> (<span class="hljs-number">0</span> = <span class="hljs-keyword">normal</span>, <span class="hljs-number">1</span> = Gauss, <span class="hljs-number">2</span> = Triangulaire) :
</code></pre><p>pour ce dernier paramètre, entrez <code>0</code>, <code>1</code> ou <code>2</code> pour choisir comment les Pokémon seront distribués sur la carte. Si vous mettez une valeur interdite, <code>0</code> sera choisi par défaut. </p>
<p>Une fois ces paramètres rentrés, un texte défilera pour donner des estimations quant au nombre de Pokémon dans votre partie, puis le jeu commencera.</p>
<h3 id="3-la-carte">3. La carte</h3>
<p>Voilà de quoi aura l&#39;air la carte : </p>
<pre><code>╔═════════════════════════════════════════════════╗
║<span class="hljs-keyword">P</span>              ░   ░         ░          ░        ║
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
</code></pre><p>Votre personnage est représenté par le caractère <code>P</code>, il apparaît dans le coin supérieur gauche de la carte. Les <code>░</code> sont des Pokémon. votre objectif est de rencontrer tous les Pokémon de la carte. </p>
<p>Pour cela, déplacez-vous avec les touches <code>Z</code>, <code>Q</code>, <code>S</code> et <code>D</code>. Lancez un combat contre un Pokémon sauvage en entrant en contact avec lui. </p>
<h3 id="4-combat">4. Combat</h3>
<p>Une fois que vous aurez rencontré un <code>░</code>, un combat ce lancera.</p>
<pre><code>                  MORPHEO
                  PV <span class="hljs-number">70</span>/<span class="hljs-number">70</span>
   PIKACHU
   PV <span class="hljs-number">58</span>/<span class="hljs-number">100</span>

Un MORPHEO sauvage apparait !
Que doit faire PIKACHU ?

R - ATTAQUE      T - POKEMON
F - CAPTURE      G - FUITE
V - ESTIMATIONS
</code></pre><p>Appuyez sur <code>R</code> pour tenter d&#39;attaquer le Pokémon sauvage, appuyez sur <code>F</code> pour tenter de le capturer, appuyez sur <code>T</code> pour gérer votre équipe et appuyez sur <code>G</code> pour prendre la fuite. </p>
<p>Appuyez sur la touche <code>V</code> pour avoir des estimations sur ce qu&#39;il va ce passer lors du prochain tour. </p>
<h4 id="gestion-de-l-quipe">Gestion de l&#39;équipe</h4>
<p>Vous commencez le jeu avec un Pikachu et votre équipe peut contenir jusqu&#39;à 6 Pokémon. </p>
<p>En appuyant sur la touche <code>T</code> lors d&#39;un combat, on vous demandera</p>
<pre><code><span class="hljs-attribute">Quel</span> Pokemon doit remplacer PIKACHU ?
</code></pre><p>Entrez un nombre entre 0 et 5 puis appuyez sur entrée pour placer le Pokémon correspondant en première position dans l&#39;équipe. Au lancement d&#39;un combat contre un pokémon sauvage, c&#39;est le premier Pokémon de l&#39;équipe qui est envoyé. </p>
<p>Si vous capturez un Pokémon alors que votre équipe est complète, le jeu vous proposera de relâcher un de vos pokémon pour l&#39;accueillir. Vous pourrez aussi relâcher le pokémon que vous venez de capturer en entrant 6. </p>
<p>Si vous entrez une valeur interdite (&gt;5 ou 0 par exemple) ou si vous tentez de mettre en première position un Pokémon n&#39;ayant plus de PV, il ne se passera rien. tapez un autre chiffre valide puis appuyez sur entrée. </p>
<h3 id="5-statistiques-des-pok-mon">5. Statistiques des Pokémon</h3>
<p>96 Pokémon sont rencontrables dans le jeu. Moins sa rareté est élevée, plus le Pokémon est rare. </p>
<table>
<thead>
<tr>
<th>Nom</th>
<th>Type</th>
<th>PV max.</th>
<th>Attaque</th>
<th>Défense</th>
<th>Taux de capture</th>
<th>Précision</th>
<th>Rareté</th>
</tr>
</thead>
<tbody>
<tr>
<td>PIKACHU</td>
<td>Electrik</td>
<td>110</td>
<td>70</td>
<td>70</td>
<td>80</td>
<td>120</td>
<td>1</td>
</tr>
<tr>
<td>CANARTICHO</td>
<td>Normal</td>
<td>52</td>
<td>90</td>
<td>55</td>
<td>75</td>
<td>60</td>
<td>2</td>
</tr>
<tr>
<td>KANGOUREX</td>
<td>Roche</td>
<td>105</td>
<td>95</td>
<td>80</td>
<td>18</td>
<td>90</td>
<td>2</td>
</tr>
<tr>
<td>SCARABRUTE</td>
<td>Plante</td>
<td>65</td>
<td>125</td>
<td>100</td>
<td>18</td>
<td>85</td>
<td>2</td>
</tr>
<tr>
<td>TAUROS</td>
<td>Normal</td>
<td>75</td>
<td>100</td>
<td>95</td>
<td>18</td>
<td>110</td>
<td>2</td>
</tr>
<tr>
<td>LOKHLASS</td>
<td>Eau</td>
<td>130</td>
<td>85</td>
<td>80</td>
<td>18</td>
<td>110</td>
<td>3</td>
</tr>
<tr>
<td>INSOLOURDO</td>
<td>Roche</td>
<td>100</td>
<td>70</td>
<td>70</td>
<td>75</td>
<td>45</td>
<td>3</td>
</tr>
<tr>
<td>QWILFISH</td>
<td>Eau</td>
<td>65</td>
<td>95</td>
<td>85</td>
<td>15</td>
<td>95</td>
<td>2</td>
</tr>
<tr>
<td>CARATROC</td>
<td>Roche</td>
<td>20</td>
<td>10</td>
<td>230</td>
<td>75</td>
<td>5</td>
<td>2</td>
</tr>
<tr>
<td>SCARINHO</td>
<td>Plante</td>
<td>80</td>
<td>125</td>
<td>75</td>
<td>18</td>
<td>85</td>
<td>2</td>
</tr>
<tr>
<td>CORAYON</td>
<td>Eau</td>
<td>65</td>
<td>55</td>
<td>95</td>
<td>25</td>
<td>35</td>
<td>4</td>
</tr>
<tr>
<td>CADOIZO</td>
<td>Eau</td>
<td>45</td>
<td>55</td>
<td>45</td>
<td>15</td>
<td>75</td>
<td>4</td>
</tr>
<tr>
<td>AIRMURE</td>
<td>Roche</td>
<td>65</td>
<td>80</td>
<td>140</td>
<td>10</td>
<td>70</td>
<td>2</td>
</tr>
<tr>
<td>QUEULORIOR</td>
<td>Normal</td>
<td>55</td>
<td>20</td>
<td>35</td>
<td>18</td>
<td>75</td>
<td>5</td>
</tr>
<tr>
<td>ECREMEUH</td>
<td>Normal</td>
<td>95</td>
<td>80</td>
<td>100</td>
<td>15</td>
<td>100</td>
<td>2</td>
</tr>
<tr>
<td>TENEFIX</td>
<td>Roche</td>
<td>50</td>
<td>75</td>
<td>75</td>
<td>18</td>
<td>50</td>
<td>4</td>
</tr>
<tr>
<td>MYSDIBULE</td>
<td>Roche</td>
<td>50</td>
<td>85</td>
<td>85</td>
<td>18</td>
<td>50</td>
<td>3</td>
</tr>
<tr>
<td>POSIPI</td>
<td>Electrik</td>
<td>60</td>
<td>50</td>
<td>40</td>
<td>80</td>
<td>95</td>
<td>3</td>
</tr>
<tr>
<td>NEGAPI</td>
<td>Electrik</td>
<td>60</td>
<td>50</td>
<td>40</td>
<td>80</td>
<td>95</td>
<td>3</td>
</tr>
<tr>
<td>MUCIOLE</td>
<td>Plante</td>
<td>65</td>
<td>75</td>
<td>75</td>
<td>60</td>
<td>85</td>
<td>2</td>
</tr>
<tr>
<td>LUMIVOLE</td>
<td>Plante</td>
<td>65</td>
<td>75</td>
<td>75</td>
<td>60</td>
<td>85</td>
<td>2</td>
</tr>
<tr>
<td>CHARTOR</td>
<td>Feu</td>
<td>70</td>
<td>85</td>
<td>140</td>
<td>35</td>
<td>20</td>
<td>2</td>
</tr>
<tr>
<td>SPINDA</td>
<td>Normal</td>
<td>60</td>
<td>60</td>
<td>60</td>
<td>60</td>
<td>60</td>
<td>3</td>
</tr>
<tr>
<td>MANGRIFF</td>
<td>Normal</td>
<td>73</td>
<td>115</td>
<td>60</td>
<td>35</td>
<td>90</td>
<td>2</td>
</tr>
<tr>
<td>SEVIPER</td>
<td>Normal</td>
<td>73</td>
<td>115</td>
<td>60</td>
<td>35</td>
<td>90</td>
<td>2</td>
</tr>
<tr>
<td>SELEROC</td>
<td>Roche</td>
<td>90</td>
<td>55</td>
<td>65</td>
<td>15</td>
<td>70</td>
<td>4</td>
</tr>
<tr>
<td>SOLAROC</td>
<td>Roche</td>
<td>90</td>
<td>55</td>
<td>65</td>
<td>15</td>
<td>70</td>
<td>4</td>
</tr>
<tr>
<td>MORPHEO</td>
<td>Normal</td>
<td>70</td>
<td>70</td>
<td>70</td>
<td>70</td>
<td>70</td>
<td>2</td>
</tr>
<tr>
<td>KECLEON</td>
<td>Normal</td>
<td>60</td>
<td>90</td>
<td>70</td>
<td>80</td>
<td>40</td>
<td>2</td>
</tr>
<tr>
<td>TROPIUS</td>
<td>Plante</td>
<td>99</td>
<td>58</td>
<td>83</td>
<td>78</td>
<td>51</td>
<td>3</td>
</tr>
<tr>
<td>ABSOL</td>
<td>Normal</td>
<td>65</td>
<td>130</td>
<td>60</td>
<td>12</td>
<td>75</td>
<td>3</td>
</tr>
<tr>
<td>RELICANTH</td>
<td>Eau</td>
<td>100</td>
<td>90</td>
<td>100</td>
<td>10</td>
<td>55</td>
<td>3</td>
</tr>
<tr>
<td>LOVDISC</td>
<td>Eau</td>
<td>43</td>
<td>30</td>
<td>55</td>
<td>88</td>
<td>97</td>
<td>3</td>
</tr>
<tr>
<td>PACHIRISU</td>
<td>Electrik</td>
<td>60</td>
<td>90</td>
<td>70</td>
<td>80</td>
<td>95</td>
<td>2</td>
</tr>
<tr>
<td>PIJAKO</td>
<td>Normal</td>
<td>76</td>
<td>45</td>
<td>70</td>
<td>75</td>
<td>91</td>
<td>2</td>
</tr>
<tr>
<td>SPIRITOMB</td>
<td>Roche</td>
<td>50</td>
<td>92</td>
<td>108</td>
<td>39</td>
<td>35</td>
<td>3</td>
</tr>
<tr>
<td>VORTENTE</td>
<td>Plante</td>
<td>74</td>
<td>100</td>
<td>72</td>
<td>78</td>
<td>46</td>
<td>2</td>
</tr>
<tr>
<td>MOTISMA</td>
<td>Normal</td>
<td>50</td>
<td>65</td>
<td>107</td>
<td>15</td>
<td>91</td>
<td>3</td>
</tr>
<tr>
<td>NANMEOUIE</td>
<td>Normal</td>
<td>103</td>
<td>60</td>
<td>86</td>
<td>100</td>
<td>50</td>
<td>2</td>
</tr>
<tr>
<td>JUDOKRAK</td>
<td>Roche</td>
<td>120</td>
<td>100</td>
<td>85</td>
<td>18</td>
<td>45</td>
<td>2</td>
</tr>
<tr>
<td>KARACLEE</td>
<td>Roche</td>
<td>75</td>
<td>125</td>
<td>75</td>
<td>18</td>
<td>85</td>
<td>3</td>
</tr>
<tr>
<td>BARGANTUA</td>
<td>Eau</td>
<td>70</td>
<td>95</td>
<td>65</td>
<td>25</td>
<td>98</td>
<td>3</td>
</tr>
<tr>
<td>MARACACHI</td>
<td>Plante</td>
<td>75</td>
<td>60</td>
<td>86</td>
<td>67</td>
<td>80</td>
<td>3</td>
</tr>
<tr>
<td>CRYPTERO</td>
<td>Feu</td>
<td>72</td>
<td>58</td>
<td>80</td>
<td>18</td>
<td>97</td>
<td>4</td>
</tr>
<tr>
<td>EMOLGA</td>
<td>Electrik</td>
<td>55</td>
<td>75</td>
<td>60</td>
<td>80</td>
<td>103</td>
<td>3</td>
</tr>
<tr>
<td>MAMANBO</td>
<td>Eau</td>
<td>165</td>
<td>75</td>
<td>80</td>
<td>30</td>
<td>65</td>
<td>1</td>
</tr>
<tr>
<td>HEXAGEL</td>
<td>Eau</td>
<td>80</td>
<td>50</td>
<td>30</td>
<td>10</td>
<td>105</td>
<td>5</td>
</tr>
<tr>
<td>LIMONDE</td>
<td>Roche</td>
<td>109</td>
<td>66</td>
<td>84</td>
<td>30</td>
<td>32</td>
<td>3</td>
</tr>
<tr>
<td>DRAKKARMIN</td>
<td>Roche</td>
<td>77</td>
<td>120</td>
<td>90</td>
<td>18</td>
<td>48</td>
<td>3</td>
</tr>
<tr>
<td>FRISON</td>
<td>Normal</td>
<td>95</td>
<td>110</td>
<td>95</td>
<td>18</td>
<td>55</td>
<td>3</td>
</tr>
<tr>
<td>AFLAMANOIR</td>
<td>Feu</td>
<td>85</td>
<td>97</td>
<td>66</td>
<td>35</td>
<td>65</td>
<td>3</td>
</tr>
<tr>
<td>FERMITE</td>
<td>Plante</td>
<td>58</td>
<td>109</td>
<td>112</td>
<td>35</td>
<td>109</td>
<td>2</td>
</tr>
<tr>
<td>COUAFAREL</td>
<td>Normal</td>
<td>75</td>
<td>80</td>
<td>60</td>
<td>47</td>
<td>102</td>
<td>3</td>
</tr>
<tr>
<td>BRUTALIBRE</td>
<td>Normal</td>
<td>78</td>
<td>92</td>
<td>75</td>
<td>39</td>
<td>115</td>
<td>3</td>
</tr>
<tr>
<td>DEDENNE</td>
<td>Electrik</td>
<td>67</td>
<td>60</td>
<td>60</td>
<td>75</td>
<td>101</td>
<td>3</td>
</tr>
<tr>
<td>STRASSIE</td>
<td>Roche</td>
<td>50</td>
<td>50</td>
<td>150</td>
<td>15</td>
<td>50</td>
<td>4</td>
</tr>
<tr>
<td>TROUSSELIN</td>
<td>Feu</td>
<td>57</td>
<td>80</td>
<td>91</td>
<td>29</td>
<td>75</td>
<td>4</td>
</tr>
<tr>
<td>BROCELOME</td>
<td>Plante</td>
<td>43</td>
<td>70</td>
<td>48</td>
<td>50</td>
<td>38</td>
<td>6</td>
</tr>
<tr>
<td>PLUMELINE</td>
<td>Feu</td>
<td>75</td>
<td>70</td>
<td>70</td>
<td>20</td>
<td>93</td>
<td>4</td>
</tr>
<tr>
<td>FROUSSARDINE</td>
<td>Eau</td>
<td>45</td>
<td>20</td>
<td>20</td>
<td>60</td>
<td>40</td>
<td>7</td>
</tr>
<tr>
<td>GUERILANDE</td>
<td>Plante</td>
<td>51</td>
<td>52</td>
<td>90</td>
<td>24</td>
<td>100</td>
<td>4</td>
</tr>
<tr>
<td>GOUROUTAN</td>
<td>Plante</td>
<td>90</td>
<td>60</td>
<td>80</td>
<td>18</td>
<td>60</td>
<td>4</td>
</tr>
<tr>
<td>QUARTERMAC</td>
<td>Plante</td>
<td>100</td>
<td>120</td>
<td>90</td>
<td>18</td>
<td>80</td>
<td>2</td>
</tr>
<tr>
<td>CONCOMBAFFE</td>
<td>Eau</td>
<td>55</td>
<td>60</td>
<td>130</td>
<td>60</td>
<td>5</td>
<td>4</td>
</tr>
<tr>
<td>METENO</td>
<td>Roche</td>
<td>60</td>
<td>100</td>
<td>60</td>
<td>80</td>
<td>120</td>
<td>2</td>
</tr>
<tr>
<td>DODOALA</td>
<td>Normal</td>
<td>65</td>
<td>115</td>
<td>65</td>
<td>45</td>
<td>65</td>
<td>3</td>
</tr>
<tr>
<td>BOUMATA</td>
<td>Feu</td>
<td>60</td>
<td>78</td>
<td>135</td>
<td>30</td>
<td>36</td>
<td>4</td>
</tr>
<tr>
<td>TOGEDEMARU</td>
<td>Electrik</td>
<td>65</td>
<td>98</td>
<td>43</td>
<td>70</td>
<td>96</td>
<td>4</td>
</tr>
<tr>
<td>MIMIQUI</td>
<td>Electrik</td>
<td>55</td>
<td>90</td>
<td>80</td>
<td>17</td>
<td>96</td>
<td>4</td>
</tr>
<tr>
<td>DENTICRISSE</td>
<td>Eau</td>
<td>68</td>
<td>105</td>
<td>70</td>
<td>30</td>
<td>92</td>
<td>3</td>
</tr>
<tr>
<td>DRAIEUL</td>
<td>Normal</td>
<td>78</td>
<td>60</td>
<td>85</td>
<td>30</td>
<td>36</td>
<td>4</td>
</tr>
<tr>
<td>SINISTRAIL</td>
<td>Plante</td>
<td>70</td>
<td>131</td>
<td>100</td>
<td>10</td>
<td>40</td>
<td>3</td>
</tr>
<tr>
<td>KATAGAMI</td>
<td>Plante</td>
<td>59</td>
<td>181</td>
<td>131</td>
<td>3</td>
<td>109</td>
<td>1</td>
</tr>
<tr>
<td>NIGOSIER</td>
<td>Eau</td>
<td>70</td>
<td>85</td>
<td>55</td>
<td>18</td>
<td>85</td>
<td>4</td>
</tr>
<tr>
<td>HEXADRON</td>
<td>Roche</td>
<td>65</td>
<td>100</td>
<td>100</td>
<td>18</td>
<td>75</td>
<td>3</td>
</tr>
<tr>
<td>WIMESSIR</td>
<td>Normal</td>
<td>65</td>
<td>60</td>
<td>60</td>
<td>12</td>
<td>90</td>
<td>5</td>
</tr>
<tr>
<td>DURALUGON</td>
<td>Roche</td>
<td>70</td>
<td>95</td>
<td>115</td>
<td>18</td>
<td>85</td>
<td>3</td>
</tr>
<tr>
<td>WATTAPIK</td>
<td>Electrik</td>
<td>48</td>
<td>100</td>
<td>95</td>
<td>75</td>
<td>15</td>
<td>4</td>
</tr>
<tr>
<td>DOLMAN</td>
<td>Roche</td>
<td>100</td>
<td>20</td>
<td>20</td>
<td>25</td>
<td>70</td>
<td>5</td>
</tr>
<tr>
<td>BEKAGLACON</td>
<td>Eau</td>
<td>75</td>
<td>80</td>
<td>110</td>
<td>60</td>
<td>130</td>
<td>2</td>
</tr>
<tr>
<td>MORPEKO</td>
<td>Electrik</td>
<td>58</td>
<td>90</td>
<td>60</td>
<td>70</td>
<td>97</td>
<td>3</td>
</tr>
<tr>
<td>TAPATOES</td>
<td>Normal</td>
<td>82</td>
<td>96</td>
<td>51</td>
<td>74</td>
<td>92</td>
<td>3</td>
</tr>
<tr>
<td>CRAPAROI</td>
<td>Roche</td>
<td>90</td>
<td>100</td>
<td>115</td>
<td>47</td>
<td>75</td>
<td>3</td>
</tr>
<tr>
<td>LESTOMBAILE</td>
<td>Normal</td>
<td>70</td>
<td>103</td>
<td>85</td>
<td>10</td>
<td>82</td>
<td>3</td>
</tr>
<tr>
<td>FERDETER</td>
<td>Roche</td>
<td>70</td>
<td>85</td>
<td>145</td>
<td>10</td>
<td>65</td>
<td>3</td>
</tr>
<tr>
<td>FLAMENROULE</td>
<td>Feu</td>
<td>82</td>
<td>115</td>
<td>74</td>
<td>39</td>
<td>70</td>
<td>3</td>
</tr>
<tr>
<td>DELESTIN</td>
<td>Eau</td>
<td>90</td>
<td>102</td>
<td>73</td>
<td>39</td>
<td>70</td>
<td>3</td>
</tr>
<tr>
<td>OYACATA</td>
<td>Eau</td>
<td>150</td>
<td>100</td>
<td>115</td>
<td>10</td>
<td>35</td>
<td>1</td>
</tr>
<tr>
<td>NIGIRIGON</td>
<td>Eau</td>
<td>68</td>
<td>50</td>
<td>60</td>
<td>39</td>
<td>82</td>
<td>4</td>
</tr>
<tr>
<td>MOTORIZARD</td>
<td>Normal</td>
<td>70</td>
<td>95</td>
<td>65</td>
<td>74</td>
<td>121</td>
<td>2</td>
</tr>
<tr>
<td>CHONGJIAN</td>
<td>Plante</td>
<td>85</td>
<td>85</td>
<td>100</td>
<td>2</td>
<td>70</td>
<td>3</td>
</tr>
<tr>
<td>BAOJIAN</td>
<td>Eau</td>
<td>80</td>
<td>120</td>
<td>80</td>
<td>2</td>
<td>135</td>
<td>2</td>
</tr>
<tr>
<td>DINGLU</td>
<td>Roche</td>
<td>155</td>
<td>110</td>
<td>125</td>
<td>2</td>
<td>42</td>
<td>1</td>
</tr>
<tr>
<td>YUYU</td>
<td>Feu</td>
<td>55</td>
<td>80</td>
<td>80</td>
<td>2</td>
<td>100</td>
<td>4</td>
</tr>
<tr>
<td>RUGIT-LUNE</td>
<td>Roche</td>
<td>105</td>
<td>139</td>
<td>71</td>
<td>6</td>
<td>119</td>
<td>1</td>
</tr>
<tr>
<td>GARDE-DE-FER</td>
<td>Roche</td>
<td>74</td>
<td>130</td>
<td>90</td>
<td>6</td>
<td>116</td>
<td>2</td>
</tr>
</tbody>
</table>
<h3 id="6-int-ractions-entre-les-types">6. Intéractions entre les types</h3>
<p>Pour des raisons de simplicité, les 96 Pokémon sont répartis dans 6 types. Il n&#39;y a pas de double-type.</p>
<table>
<thead>
<tr>
<th></th>
<th>Normal</th>
<th>Eau</th>
<th>Feu</th>
<th>Plante</th>
<th>Electrik</th>
<th>Roche</th>
</tr>
</thead>
<tbody>
<tr>
<td>Normal</td>
<td>1</td>
<td>1</td>
<td>1</td>
<td>1</td>
<td>1</td>
<td>1</td>
</tr>
<tr>
<td>Eau</td>
<td>1</td>
<td>1</td>
<td>2</td>
<td>0.5</td>
<td>0.5</td>
<td>2</td>
</tr>
<tr>
<td>Feu</td>
<td>1</td>
<td>0.5</td>
<td>1</td>
<td>2</td>
<td>1</td>
<td>0.5</td>
</tr>
<tr>
<td>Plante</td>
<td>1</td>
<td>2</td>
<td>0.5</td>
<td>1</td>
<td>0.5</td>
<td>2</td>
</tr>
<tr>
<td>Electrik</td>
<td>1</td>
<td>2</td>
<td>1</td>
<td>2</td>
<td>1</td>
<td>0.5</td>
</tr>
<tr>
<td>Roche</td>
<td>1</td>
<td>2</td>
<td>2</td>
<td>.5</td>
<td>2</td>
<td>1</td>
</tr>
</tbody>
</table>
<h2 id="ii-lois-de-probabilit-s-et-variables-al-atoires-utilis-es">II. Lois de probabilités et variables aléatoires utilisées</h2>
<p><strong>Dans cette partie, les extraits de code seront montrés en C++. Ils ont été implémentés de la même manière en JavaScript</strong></p>
<h3 id="1-loi-uniforme">1. Loi uniforme</h3>
<p>La loi uniforme modélise une situation où chaque événement à la même probabilité d&#39;arriver. </p>
<h4 id="impl-mentation">Implémentation</h4>
<p>La loi uniforme a été implémentée en utilisant la fonction <code>rand()</code> de la librarie C++ <code>stdlib.h</code>. </p>
<p>Implémentée ainsi : <code>static_cast&lt;float&gt;(rand())/RAND_MAX;</code>, elle permet de retourner une valeur aléatoire entre 0 et 1 (compris) de manière uniforme.</p>
<p>Cette loi sert à définir les autres lois. </p>
<h4 id="dans-le-jeu">Dans le jeu</h4>
<ul>
<li>Elle sert lors de l&#39;initialisation de la carte : le Pokémon qui est assigné à chaque <code>?</code> est déterminé lors de la création de la carte. Un <code>std::vector</code> contenant chaque Pokémon multiplié par son taux de rareté (entre 1 et 7) est créé auparavant. Pour savoir quel pokémon sera assigné à un<code>?</code>, un nombre est tiré uniformément entre 0 et la longeur du <code>std::vector</code> et ce sera le Pokémon situé à cette position dans le vecteur qui sera tiré. </li>
<li>Elle sert aussi lors d&#39;un combat, quand on tente de capturer un pokémon sauvage, une valeur aléatoire entre 0 et 100 est tirée uniformément et si elle est inférieure au pourcentage de chance de capturer le Pokémon, le celui-ci est capturé. </li>
</ul>
<h3 id="2-loi-g-om-trique">2. Loi géométrique</h3>
<p>La loi géométrique modélise le nombre d&#39;essais nécessaires avant d&#39;obtenir un succès. </p>
<h4 id="impl-mentation">Implémentation</h4>
<p>La fonction permettant de connaître le nombre d&#39;essais nécéssaire avant d&#39;obtenir un succès est implémentée comme ceci : </p>
<pre><code class="lang-cpp"><span class="hljs-function"><span class="hljs-keyword">int</span> <span class="hljs-title">essaisGeometrique</span><span class="hljs-params">(<span class="hljs-keyword">float</span> p)</span> </span>{
    <span class="hljs-keyword">int</span> k = <span class="hljs-number">1</span>;
    <span class="hljs-keyword">float</span> Px = <span class="hljs-built_in">std</span>::<span class="hljs-built_in">pow</span>(<span class="hljs-number">1</span>-p, k<span class="hljs-number">-1</span>)*p;
    <span class="hljs-keyword">while</span>(Px &lt; <span class="hljs-number">0.95</span>) {
        ++k;
        Px += <span class="hljs-built_in">std</span>::<span class="hljs-built_in">pow</span>(<span class="hljs-number">1</span>-p, k<span class="hljs-number">-1</span>)*p;
    }
    <span class="hljs-keyword">return</span> k;
}
</code></pre>
<p>le paramètre <code>p</code> utilisé en paramètre de la fonction est une probabilité donnée grâce à l&#39;ID du joueur. La valeur 0.95 à été choisie arbitrairement. </p>
<p>Une autre fonction a été implémentée pour cette loi : </p>
<pre><code class="lang-cpp"><span class="hljs-keyword">float</span> geometrique(<span class="hljs-keyword">int</span> <span class="hljs-keyword">id</span>) {
    <span class="hljs-keyword">int</span> tries = <span class="hljs-number">1</span>;
    <span class="hljs-keyword">float</span> p = getPFromId(<span class="hljs-keyword">id</span>);
    <span class="hljs-keyword">float</span> pick = uniforme();
    <span class="hljs-keyword">while</span> (pick &gt; p) {
        ++tries;
        pick = uniforme();
    }
    <span class="hljs-keyword">return</span> probaGeometrique(<span class="hljs-keyword">id</span>, tries);
}
</code></pre>
<p>avec</p>
<pre><code class="lang-cpp"><span class="hljs-function"><span class="hljs-keyword">float</span> <span class="hljs-title">probaGeometrique</span><span class="hljs-params">(<span class="hljs-keyword">int</span> id, <span class="hljs-keyword">int</span> k)</span> </span>{
    <span class="hljs-keyword">float</span> p = getPFromId(id);
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">std</span>::<span class="hljs-built_in">pow</span>(<span class="hljs-number">1</span>-p, k<span class="hljs-number">-1</span>)*p;
}
</code></pre>
<p>Cette fonction modélise les essais avant d&#39;obtenir un succès et calcule la probabilité d&#39;obtenir la situation modélisée. </p>
<h4 id="dans-le-jeu">Dans le jeu</h4>
<p>Elle sert lors des estimations. Dans un combat, en utilisant la touche <code>V</code>, la loi géométrique est utilisée pour estimer le nombre d&#39;essais nécéssaires avant que votre Pokémon arrive a toucher son adversaire avec une attaque et inversement. Elle sert aussi a estimer le nombre d&#39;essais nécéssaires avant de réussir à capturer le pokémon adverse. </p>
<h3 id="3-loi-de-bernoulli">3. Loi de Bernoulli</h3>
<p>La loi de Bernoulli modélise une situation si ne peut avoir que 2 issues : un succès, de probabilité $p$ et un échec, de probabilité $1-p$.</p>
<h4 id="impl-mentation">Implémentation</h4>
<p>La fonction permettant de connaitre si l&#39;expérience de bernoulli est un succès est définie comme suit : </p>
<pre><code class="lang-cpp"><span class="hljs-function"><span class="hljs-keyword">bool</span> <span class="hljs-title">bernouilli</span><span class="hljs-params">(<span class="hljs-keyword">float</span> p)</span> </span>{
    <span class="hljs-keyword">float</span> val = uniforme();
    <span class="hljs-keyword">return</span> val &lt; p ? <span class="hljs-literal">true</span> : <span class="hljs-literal">false</span>;
}
</code></pre>
<p>avec le paramètre <code>p</code>, une probabilité de succès. </p>
<h4 id="dans-le-jeu">Dans le jeu</h4>
<p>Elle sert en combat, au moment d&#39;attaquer. la loi de Bernoulli est utilisée pour savoir si le pokémon attaquant va réussi à toucher l&#39;autre. en cas de succès, tous les calculs sont réalisés, en cas d&#39;échec une ligne de texte vous indique que le pokémon a raté son attaque. La probabilité <code>p</code> donnée en paramètre de la fonction est calculée à partir de la statistique de précision du pokemon. $$p = \frac{\frac{\rm{précision}*90}{130}+20}{100}$$</p>
<p><em>(<code>p</code> peut être supérieur à 1, votre Pokémon touchera à tous les coups)</em></p>
<h3 id="4-loi-binomiale">4. Loi binomiale</h3>
<p>La loi binomiale modélise la probabilité d&#39;obtenir un certain nombre de succès de probabilté $p$ parmi un nombre d&#39;essais. </p>
<h4 id="impl-mentation">Implémentation</h4>
<p>la fonction permettant de connaitre la probabilité de $k$ succès parmi $n$ expériences réalisées est implémentée comme suit : </p>
<pre><code class="lang-cpp"><span class="hljs-function"><span class="hljs-keyword">float</span> <span class="hljs-title">binomiale</span><span class="hljs-params">(<span class="hljs-keyword">int</span> id, <span class="hljs-keyword">int</span> k, <span class="hljs-keyword">int</span> n)</span> </span>{
    <span class="hljs-keyword">float</span> p = getPFromId(id);
    <span class="hljs-keyword">float</span> Cnk = (<span class="hljs-keyword">float</span>)fact(n)/((<span class="hljs-keyword">float</span>)fact(k)*(<span class="hljs-keyword">float</span>)fact(n-k));
    <span class="hljs-keyword">float</span> Pk = Cnk*<span class="hljs-built_in">std</span>::<span class="hljs-built_in">pow</span>(p, k)*<span class="hljs-built_in">std</span>::<span class="hljs-built_in">pow</span>(<span class="hljs-number">1</span>-p, n-k);
    <span class="hljs-keyword">return</span> Pk;
}
</code></pre>
<p>pour une meilleure lisibilité : $$C_n^k=\frac{n!}{k!\times(n-k)!}\P_k=C_n^k\times p^k(1-p)^{n-k}$$</p>
<p>avec comme paramètre <code>id</code> l&#39;ID du joueur qui donne la probabilité de succès. </p>
<h4 id="dans-le-jeu">Dans le jeu</h4>
<p>Elle sert dans les combats, au moment de la capture. Dans les jeux Pokémon originaux, lorsqu&#39;on tente de capturer un pokémon sauvage, la Poké Ball (objet permettant de capturer et dans laquelle est enfermée le Pokémon) tremble 3 fois avant de se refermer et de confirmer la capture. Ici cette situation est modélisée avec une loi de bernoulli. 1 succès parmi 4 essais vaut 1 tremblement, 2 succès parmi 4 essais vaut 2 tremblements, 3 succès parmi 4 essais vaut 3 tremblements et enfin 4 succès parmi 4 essais vaut la fermeture de la Poké Ball. </p>
<p>d&#39;autres paramètres rentrent en considération lors de la capture, le pourcentage de chances de capturer est calculé ainsi : $$p<em>{\times100} = \rm{binomiale}(ID, 4, 4)\times\frac{taux}{2}\times\left(1-\frac{PV</em>{actuels}-1}{PV_{max}}\right)\times100$$</p>
<h3 id="5-loi-de-poisson">5. Loi de Poisson</h3>
<p>La loi de Poisson décrit le comportement du nombre d&#39;événements se produisant dans un intervalle temporel ou spacial.</p>
<h4 id="impl-mentation">Implémentation</h4>
<p>La fonction permettant de connaitre le nombre d&#39;événements sur une aire est définie comme suit : </p>
<pre><code class="lang-cpp"><span class="hljs-function"><span class="hljs-keyword">int</span> <span class="hljs-title">poisson</span><span class="hljs-params">(<span class="hljs-keyword">float</span> lambda)</span> </span>{
    <span class="hljs-keyword">float</span> L = <span class="hljs-built_in">std</span>::<span class="hljs-built_in">exp</span>(-lambda);
    <span class="hljs-keyword">float</span> p = <span class="hljs-number">1.0</span>;
    <span class="hljs-keyword">int</span> k = <span class="hljs-number">0</span>;

    <span class="hljs-keyword">while</span> (p &gt; L) {
        ++k;
        p *= uniforme();
    }

    <span class="hljs-keyword">return</span> k<span class="hljs-number">-1</span>;
}
</code></pre>
<p>Elle prend en entrée le paramètre <code>lambda</code> calculé à l&#39;avance. </p>
<h4 id="dans-le-jeu">Dans le jeu</h4>
<p>Elle sert au tout début du jeu, a donner le nombre de Pokémon (<code>?</code>) qui apparaîtront sur la carte. Le paramètre <code>lambda</code> est calculé en fonction de la hauteur et de la largeur renseignées, ainsi que d&#39;une probabilité calculée à partir de l&#39;ID du joueur : $$\lambda=p_{ID}\times\frac{\rm{hauteur}}{3}\times\frac{\rm{largeur}}{3}$$</p>
<h3 id="6-loi-hyperg-om-trique">6. Loi hypergéométrique</h3>
<p>La loi hypergéométrique permet d&#39;obtenir le nombre d&#39;éléments présentant une caractéristique particulière parmi une sélection d&#39;éléments</p>
<h4 id="impl-mentation">Implémentation</h4>
<p>La fonction permettant d&#39;estimer le nombre d&#39;éléments particuliers parmi $x$ éléments, tirés d&#39;une population de $m$ éléments, dans laquelle on retrouve $n$ éléments particuliers est définie comme suit : </p>
<pre><code class="lang-cpp"><span class="hljs-function"><span class="hljs-keyword">int</span> <span class="hljs-title">hypergeometrique</span><span class="hljs-params">(<span class="hljs-keyword">int</span> n, <span class="hljs-keyword">int</span> m, <span class="hljs-keyword">int</span> x, <span class="hljs-keyword">int</span> iter)</span> </span>{
        <span class="hljs-keyword">int</span> mTotal = <span class="hljs-number">0</span>;
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">int</span> i = <span class="hljs-number">0</span>; i &lt; iter; ++i) {
            <span class="hljs-keyword">int</span> xSample = <span class="hljs-number">0</span>;
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">int</span> j = <span class="hljs-number">0</span>; j &lt; x; ++j) {
                <span class="hljs-keyword">int</span> val = uniforme()*n;
                <span class="hljs-keyword">if</span> (val &lt; m) {
                    xSample++;
                }
            }
            mTotal += xSample;
        }
        <span class="hljs-keyword">return</span> mTotal / iter;
    }
</code></pre>
<p>la paramètre <code>iter</code> permet de réaliser la simulation un certain nombre de fois et d&#39;obtenir une moyenne. </p>
<h4 id="dans-le-jeu">Dans le jeu</h4>
<p>Elle sert au tout début du jeu, juste après la loi de Poisson permettant de donner le nombre de Pokémon qui apparaîtront sur la carte. La Loi hypergéométrique est utilisée pour estimer le nombre de Pokémon rares qui apparaîtront. Chaque Pokémon à une statistique de rareté qui lui est assignée. Un pokémon ayant une valeur 1 ou 2 est considéré comme rare. La valeur va jusqu&#39;à 7. Un Pokémon ayant une valeur de rareté égale à 7 est 7 fois moins rare qu&#39;un Pokémon ayant une rareté de 1. </p>
<p>En prenant en compte les 96 Pokémon du jeu et en la multipliant par la rareté de chacun, cela nous donne le paramètre $m = 286$. </p>
<p>En prenant seulement les pokémon considérés comme rare et en les multipliant par leur rareté de respectives, on obtient le paramètre $n=62$</p>
<p>Avec $x$ défini avec la loi de Poisson juste avant et <code>iter</code> fixé à 1000.</p>
<h3 id="7-loi-normale-centr-e-r-duite">7. Loi normale centrée réduite</h3>
<p>La loi normale centrée réduite permet de modéliser différentes situations dans de nombreux domaines comme la distribution des tailles d&#39;une population ou la plage de résultats de tests standardisés (QI) par exemple.</p>
<h4 id="impl-mentation">Implémentation</h4>
<p>La fonction permettant de simuler une loi normale centrée réduite grâce à une courbe en cloche de Gauss est définie comme suit : </p>
<pre><code class="lang-cpp"><span class="hljs-comment">// Quand courbe vaut 1</span>
<span class="hljs-keyword">float</span> densite(<span class="hljs-keyword">int</span> id, <span class="hljs-keyword">int</span> courbe) {
    <span class="hljs-keyword">float</span> val = uniforme();
    <span class="hljs-keyword">if</span> (courbe == <span class="hljs-number">1</span>) {
        val = uniforme()*<span class="hljs-number">3</span><span class="hljs-number">-1.5</span>;
        <span class="hljs-keyword">float</span> <span class="hljs-keyword">image</span> = uniforme()*<span class="hljs-number">.38</span>;
        <span class="hljs-keyword">float</span> obj = <span class="hljs-keyword">gauss</span>(val);
        <span class="hljs-keyword">while</span> (<span class="hljs-keyword">image</span> &gt; obj) {
            val = uniforme()*<span class="hljs-number">3</span><span class="hljs-number">-1.5</span>;
            obj = <span class="hljs-keyword">gauss</span>(val);
        }
        val = (val+<span class="hljs-number">1.5</span>)/<span class="hljs-number">3</span>;
    } 
    <span class="hljs-comment">/*else if (courbe == 2) {
        val = triangulaire(1);

    }*/</span>
    <span class="hljs-keyword">return</span> val;
}
</code></pre>
<p>avec</p>
<pre><code class="lang-cpp"><span class="hljs-function"><span class="hljs-keyword">float</span> <span class="hljs-title">gauss</span><span class="hljs-params">(<span class="hljs-keyword">float</span> val)</span> </span>{
    <span class="hljs-keyword">return</span> (<span class="hljs-number">1</span>/(<span class="hljs-built_in">std</span>::<span class="hljs-built_in">sqrt</span>(<span class="hljs-number">2</span>*M_PI)))*<span class="hljs-built_in">std</span>::<span class="hljs-built_in">exp</span>(<span class="hljs-number">-2.0</span>*val*val);
}
</code></pre>
<p>Pour une meilleure lisibilité, la fonction <code>gauss(float val)</code> renvoie $$\frac{1}{\sqrt{2\pi}}\times e^{-2\rm{val}^2}$$</p>
<p>Cette fonction donne une courde en cloche de gauss centrée sur $0$ et légèrement déformée pour resserrer la &quot;cloche&quot; afin qu&#39;elle soit comprise entre $-1,5$ et $1,5$.</p>
<p>Dans densité(), les nombres sont tirés aléatoirement dans cet intervalle puis replacés entre $0$ et $1$ avant d&#39;être retournés </p>
<h4 id="dans-le-jeu">Dans le jeu</h4>
<p>Elle sert après avoir fait le choix de la &quot;forme&quot; de la carte. en choisissant 1, l&#39;emplacement des <code>?</code> sera fait suivant la courbe en cloche de Gauss évoquée précédemment. Tous les Pokémon devraient être distribués vers le centre de la carte avec ce choix. </p>
<h3 id="8-loi-triangulaire">8. Loi triangulaire</h3>
<p>La loi triangulaire permet de modéliser différentes situations dans de nombreux domaines comme des temps d&#39;attente ou des estimations de coûts par exemple. </p>
<h4 id="impl-mentation">Implémentation</h4>
<p>La fonction permettant de simuler une loi triangulaire est défine comme suit :</p>
<pre><code class="lang-cpp">// <span class="hljs-type">Quand</span> courbe vaut <span class="hljs-number">2</span>
<span class="hljs-built_in">float</span> densite(<span class="hljs-built_in">int</span> id, <span class="hljs-built_in">int</span> courbe) {
    <span class="hljs-built_in">float</span> val = uniforme();
    /* <span class="hljs-keyword">if</span> (courbe == <span class="hljs-number">1</span>) {
        val = uniforme()*<span class="hljs-number">3</span>-<span class="hljs-number">1</span>.<span class="hljs-number">5</span>;
        <span class="hljs-built_in">float</span> image = uniforme()*.<span class="hljs-number">38</span>;
        <span class="hljs-built_in">float</span> obj = gauss(val);
        <span class="hljs-keyword">while</span> (image &gt; obj) {
            val = uniforme()*<span class="hljs-number">3</span>-<span class="hljs-number">1</span>.<span class="hljs-number">5</span>;
            obj = gauss(val);
        }
        val = (val+<span class="hljs-number">1</span>.<span class="hljs-number">5</span>)/<span class="hljs-number">3</span>;
    } */
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (courbe == <span class="hljs-number">2</span>) {
        val = triangulaire(<span class="hljs-number">1</span>);
    }
    <span class="hljs-keyword">return</span> val;
}
</code></pre>
<p>avec</p>
<pre><code class="lang-cpp"><span class="hljs-function"><span class="hljs-keyword">float</span> <span class="hljs-title">triangulaire</span><span class="hljs-params">(<span class="hljs-keyword">float</span> mode)</span> </span>{
    <span class="hljs-keyword">float</span> val = uniforme();
    <span class="hljs-keyword">if</span> (val &lt; mode) {
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">sqrt</span>(val*mode);
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>-<span class="hljs-built_in">sqrt</span>((<span class="hljs-number">1</span>-val)*(<span class="hljs-number">1</span>-mode));
    }
}
</code></pre>
<p>Cette fonction simule une loi triangulaire de support $]0 ; 1[$ et de mode fixé à $1$.</p>
<h4 id="dans-le-jeu">Dans le jeu</h4>
<p>Elle sert après avoir fait le choix de la &quot;forme&quot; de la carte. en choisissant 2, l&#39;emplacement des <code>?</code> sera fait suivant la loi trianglaire avec les paramètres cité précédemment. Tous les Pokémon devraient être distribués vers le coin inférieur gauche de la carte avec ce choix. </p>
<h2 id="iii-liens">III. Liens</h2>
<p><a href="https://www.ericthiberge.fr/pokimax-iv">https://www.ericthiberge.fr/pokimax-iv</a></p>
<p><a href="https://github.com/DANLCARTON/Pokimax-IV">https://github.com/DANLCARTON/Pokimax-IV</a></p>
<p><a href="https://github.com/DANLCARTON/Pokimax-III">https://github.com/DANLCARTON/Pokimax-III</a></p>
<h2 id="iv-installation-en-local">IV. Installation en local</h2>
<p>Clonage du repository :</p>
<pre><code>git <span class="hljs-keyword">clone</span> <span class="hljs-title">https</span>://github.com/DANLCARTON/Pokimax-IV
</code></pre><p>Installation : </p>
<pre><code>npm <span class="hljs-keyword">install</span>
</code></pre><p>Compilation pour le développement : </p>
<pre><code>npm <span class="hljs-keyword">run</span><span class="bash"> dev</span>
</code></pre><p>Build : </p>
<pre><code>npm <span class="hljs-keyword">run</span><span class="bash"> build</span>
</code></pre>
  </div>
</template>

<style scoped>

h1 {
  margin: 20px 0;
  font-weight: bold;
  text-align: center;
}

h2 {
  margin: 15px 0;
  font-weight: bold;
}

h3 {
  margin: 10px 0;
  font-weight: bold;
}

p {
  margin: 10px 0;
}

pre {
  background: #252525;
  padding: 10px;
  line-height: 18px;
  border-radius: 10px;
}

table {
  border-collapse: collapse;
  margin: 10px 0;
}

td, th {
  padding: 5px;
  border: 1px solid white;
}

th {
  font-weight: bold;
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    /*display: flex;*/
    align-items: center;
    margin: 0 0 50px 0;
  }
}
</style>
