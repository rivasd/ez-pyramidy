# EZ Pyramidy

A Javascript implementation of the Pyramid game, powered by React and jsPsych.

## How to play?

1. go to http://rivasd.github.io/ez-pyramidy and hope there is no bug.
2. Upload the text file describing your game
3. Have fun!

## How to describe my game?

EZ pyramidy works by loading a Pyramid game described by a text file formatted in [yaml](https://learnxinyminutes.com/docs/yaml/) format. It's easy! just look at this template

```yaml
# imagine this file is called mypyramid.txt

# time in seconds the player has to clear all words in a category
max_time: 45

# a sequence of sequences. Each one has properties 'displayName', 'fullName' and another sequence called 'words'
categories:

  #displayName: what will be displayed on the pyramid
 - displayName: L'antarctique
  
   #fullName: the true name of the category that will appear if it gets chosen
   fullName: Objets froids
   
   #words: a simple list of category members the player will have to make others guess
   words:
   - La surface de pluton
   - Azote liquide
   - Vanilla Ice
   - Le Blizzard
   - Le regard d'un ennemi
   
 # you can add as many categories as you want, the Pyramid will auto-grow!
 - displayName: Wayne Gretzky
   fullName: Canadiens célèbres
   # you can override the global max time if you want some categories to allow more time! cool.
   max_time: 60
   words:
   - Avril Lavigne
   - Lester B. Pearson
   - Alexander Graham Bell
   - Ernest Rutherford
   - Celine Dion
 - displayName: L'an 3000
   fullName: Inventions de l'an 3000
   words: 
   - Hoverboard
   - Téléportation
   - Psychohistoire
   - Fin de la construction de la ligne bleu à Montréal
   - Machine à voyager dans le temps
 - displayName: Jusqu'à 20
   fullName: Contes
   words:
   - Le vaillant petit tailleur
   - Boucle d'or et les trois ours
   - Hansel et Gretel
   - Barbe-bleue
   - Sinbad le marin
   
# Ok you got the gist!
```

Your file should have a `.yml` or `.txt` extension. You can write it with any text editor like Notepad, just make sure you save in UTF-8 encoding si vous parlez le français!
