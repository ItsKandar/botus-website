# Regenere assets/mots/ depuis les listes du bot (ItsKandar/motus, bot/mots/).
# Usage : python3 -I outils/generer_mots.py <dossier contenant dico.py et mots.py> assets/mots
# Mots a deviner : 5 a 10 lettres, sans accents, presents dans le dictionnaire.
import ast, sys, unicodedata, re, json
def norm(t): return ''.join(c for c in unicodedata.normalize('NFD', t.lower()) if unicodedata.category(c) != 'Mn')
def load(p):
    src = open(p, encoding='utf-8').read()
    return ast.literal_eval(src.split('=',1)[1].strip())
dl, out = sys.argv[1], sys.argv[2]
dico = sorted({w for w in (norm(x) for x in load(dl+'/dico.py')) if re.fullmatch('[a-z]{5,10}', w)})
mots = []
for w in (norm(x) for x in load(dl+'/mots.py')):
    if re.fullmatch('[a-z]{5,10}', w) and w not in mots: mots.append(w)
dset = set(dico); missing = [w for w in mots if w not in dset]; mots = [w for w in mots if w in dset]
print(len(dico), 'dico ;', len(mots), 'mots ; absents du dico :', missing)
open(out+'/dico.txt','w').write('\n'.join(dico)+'\n')
open(out+'/mots.json','w').write(json.dumps(mots))
