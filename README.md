## Synopsis

Asymptote is a powerful C-based Vector Graphics Language that can be integrated into LaTeX documents. This package adds syntax highlighting functionality to Atom, a text editor. Other features such as automatic compile are planned, but not yet implemented.

Here are an example of the syntax highlighter in action:

![Screenshot 1](https://github.com/supakorn-ras/language-asymptote/raw/master/images/demo1.png)

The official website of Asymptote is at http://asymptote.sourceforge.net/.

## Motivation

The idea for Asymptote syntax highlighter was conceived during one of my study sessions. I was working for an assignment for Honours Calculus 2, and I needed a way to draw images digitally on LaTeX files since my drawing skills weren't good. So, I discovered Asymptote, which is a powerful vector graphics language (which I found easier to use than TikZ), however there weren't any language packages for Atom at the moment, and I found that managing asy documents is difficult due to lack of keyword emphasizing. So I've developed this package to help mitigate this difficulty.

## Installation

First of all, Atom is necessary for Installation. To install, clone this repository and copy the contents to %userprofile%/.atom/packages/language-asymptote. Restart Atom and all .asy files should be highlighted.

## Contributors

As of right now, only me (Supakorn Rassameemasmuang) is contribuiting to this project.

## Special Thanks

Dr. John Bowman, Dr. Andy Hammerlindl and Dr. Tom Prince, and other students for development of the original Asymptote language. The full credits can be seen at http://asymptote.sourceforge.net/.

## License

Copyright (c) 2017 Supakorn Rassameemasmuang

See LICENSE.md for license. This project uses derivative code built from Asymptote, which can be retrieved under https://github.com/vectorgraphics/asymptote.
