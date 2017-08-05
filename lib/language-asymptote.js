'use babel';

//     Copyright (C) 2017 Supakorn Rassameemasmuang
//
//     This program is free software: you can redistribute it and/or modify
//     it under the terms of the GNU General Public License as published by
//     the Free Software Foundation, either version 3 of the License, or
//     (at your option) any later version.
//
//     This program is distributed in the hope that it will be useful,
//     but WITHOUT ANY WARRANTY; without even the implied warranty of
//     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//     GNU General Public License for more details.
//
//     You should have received a copy of the GNU General Public License
//     along with this program.  If not, see <http://www.gnu.org/licenses/>.

import LanguageAsymptoteView from './language-asymptote-view';
import { CompositeDisposable } from 'atom';
import packageConfig from './config-schema.json'

export default {
  languageAsymptoteView: null,
  modalPanel: null,
  subscriptions: null,
  config: packageConfig,

  activate(state) {
    this.languageAsymptoteView = new LanguageAsymptoteView(state.languageAsymptoteViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.languageAsymptoteView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
        'language-asymptote:toggle': () => this.compile()
    }));

    this.subscriptions.add(atom.commands.add('atom-workspace', {
        'language-asymptote:compile': () => this.compile()
    }));



  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.languageAsymptoteView.destroy();
  },

  serialize() {
    return {
      languageAsymptoteViewState: this.languageAsymptoteView.serialize()
    };
  },

  compile() {
      let editor;
      if (editor = atom.workspace.getActiveTextEditor()) {

          let asy_proc = require('child_process');
          let path = require('path');
          let util = require('util');

          let asy_input = editor.getBuffer().getPath();
          let exec_command = 'asy ';
          let output_dir;

          function enclose_text(text) {
              return '"' + text + '"'
          }

          if (atom.config.get('language-asymptote.outputDirectory') === '') {
              output_dir = path.dirname(asy_input) + '/';
          } else {
              output_dir = atom.config.get('language-asymptote.outputDirectory');
          }


          exec_command = atom.config.get('language-asymptote.asyPath') + exec_command + atom.config.get('language-asymptote.asyParam') + ' -outname ' + enclose_text(output_dir) + ' ' + enclose_text(asy_input);
          console.log('Executing '.concat(exec_command));
          asy_proc.exec(exec_command, function (err, stdout, stderr) {
              if (err) {
                  console.log(stderr);
                  return;
              }
              console.log(stdout);
              // process.exit(0);
          })
          return;
      }

  }
};
