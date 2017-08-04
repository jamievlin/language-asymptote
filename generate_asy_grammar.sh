asy -l | set-content -Path "asy.list"
python3 ./make_asy_grammar.py > grammars/asymptote.cson
echo Done!
