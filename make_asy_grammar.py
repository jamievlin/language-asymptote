#!/usr/bin/env python3
import cson
import io
import sys
import datetime


def generate_base_pattern():
    return [
        { 'match': '//.*$', 'name':'comment.line.double-slash' },
        {
            'match' : '\\b(const|static|explicit|struct|typedef)\\b', 'name' : 'storage.modifier'
        },
        { 'begin' : '/\\*', 'end' : '\\*/', 'name' : 'comment.block' },
        {
            'begin' : '"', 'end' : '"',
            'captures' : { '1' : 'string.qutoed.double', 'end' : 'string.quoted.double' },
            'patterns' : [{'include' : 'text.tex.latex'}]
        },
        { 'match' : '\'.*?\'', 'name' : 'string.quoted.single' },
        { 'match' :
             '\\b(if|else|while|for|do|break|return|continue|unravel)\\b',
            'name' : 'keyword.control' },
        { 'match' :'\\b(new|operator)\\b', 'name' : 'keyword.operator' },
        { 'match' : '\\b(import|include|as|access|from)\\b',
            'name' : 'keyword.other' },
        { 'match' : '\\b(\\d*)(\\.?)\\d+', 'name' : 'constant.numeric'}
    ]

def generate_preamble():
    text_list = ['#     Asymptote.cson Grammar file for Atom']
    text_list.append(str.format('#     Generated on {0}', str(datetime.datetime.now())))
    text_list.append('#     Do not modify this file as changes may not be saved.\n')
    text_list.append('#     asymptote.cson - Syntax Hightling compoenent for asymptote')

    text_list.append(str.format('#     Copyright (C) 2017-{0} Supakorn Rassameemasmuang', datetime.datetime.now().year))
    text_list.extend([
    '#     ',
    '#     This program is free software: you can redistribute it and/or modify',
    '#     it under the terms of the GNU General Public License as published by',
    '#     the Free Software Foundation, either version 3 of the License, or',
    '#     (at your option) any later version.',
    '#     ',
    '#     This program is distributed in the hope that it will be useful,',
    '#     but WITHOUT ANY WARRANTY; without even the implied warranty of',
    '#     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the',
    '#     GNU General Public License for more details.',
    '#     ',
    '#     You should have received a copy of the GNU General Public License',
    '#     ',
    ''
    ])

    return '\n'.join(text_list)

def main():
    print_output = True
    output_file_name = 'asymptote.cson'

    base_grammar = {
    'scopeName': 'source.asymptote',
    'name': 'Asymptote',
    'fileTypes': ['asy']
    }

    # basic semantics not covered by asy -l
    base_pattern = generate_base_pattern()
    matched_words = set()

    try:
        asy_list_file = io.open('asy.list')
        asy_list_raw = asy_list_file.read()
        asy_list_file.close()
    except (FileNotFoundError, IOError):
        return 2

    operator_list = []
    for asy_def in asy_list_raw.split(';'):
        asy_def = asy_def.strip()
        if not asy_def:
            continue
        asy_type, asy_signature = asy_def.split(' ', 1)
        if '(' in asy_signature:
            if 'operator' in asy_signature:
                if 'init()' in asy_signature: # type
                    match_word = str.format('\\b({0})\\b', asy_type)
                    match_type = 'storage.type'
                elif 'cast(' not in asy_signature: # operator
                    operator_signature = asy_signature.split(' ', 1)[1]
                    operator_symbol = operator_signature.split('(')[0]
                    parsed_operator = []
                    for character in operator_symbol:
                        if character in {'|', '+', '*', '$', '.', '\\', '^'}:
                            parsed_operator.append('\\' + character)
                        else:
                            parsed_operator.append(character)
                    parsed_op_text = ''.join(parsed_operator)
                    if parsed_op_text.isalpha():
                        match_word = str.format('\\b({0})\\b', parsed_op_text)
                    else:
                        if parsed_op_text not in matched_words and ' ' not in parsed_op_text:
                            matched_words.add(parsed_op_text)
                            operator_list.append(parsed_op_text)
                        continue
                    match_type = 'keyword.operator'
            else: # function
                function_name = asy_signature.split('(')[0]
                match_word = str.format('\\b({0})\\b', function_name)
                match_type = 'support.function'
        else: # constant
            match_word = str.format('\\b({0})\\b', asy_signature)
            match_type = 'constant.language'
        if match_word not in matched_words:
            base_pattern.append({
            'match' : match_word,
            'name' : match_type
            })
            matched_words.add(match_word)

    base_pattern.append({
    'match': '|'.join(operator_list),
    'name' : 'keyword.operator'
    })

    base_grammar['patterns'] = base_pattern
    final_output = cson.dumps(base_grammar, indent=True)
    if print_output:
        print(generate_preamble() + final_output)
    else:
        output_file = io.open(output_file_name, 'w')
        output_file.write(generate_preamble())
        output_file.write(final_output)
        output_file.close()
        print('Done!')

if __name__ == '__main__':
    sys.exit(main() or 0)
