asy -l | set-content -Path "asy.list" 
$asy_list = python ./make_asy_grammar.py | out-string
set-content -path grammars/asymptote.cson $asy_list
echo Done!