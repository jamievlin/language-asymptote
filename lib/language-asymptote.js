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


'use babel';

import LanguageAsymptoteView from './language-asymptote-view';
import { CompositeDisposable } from 'atom';

export default {

  languageAsymptoteView: null,
  modalPanel: null,
  subscriptions: null,

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

  toggle() {
    console.log('LanguageAsymptote was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  },
<<<<<<< HEAD

  compile() {
      let editor;
      if (editor = atom.workspace.getActiveTextEditor()) {

          let asy_proc = require('child_process');
          let path = require('path');
          let util = require('util');

=======

  compile() {
      let editor;
      if (editor = atom.workspace.getActiveTextEditor()) {

          let asy_proc = require('child_process');
          let path = require('path');
          let util = require('util');

>>>>>>> 31f9a918012ff8e1486fd90d41fb7933c56ecaa5
          let asy_input = editor.getBuffer().getPath();

          var command_dict = { 'outformat': 'pdf' };
          let exec_command = 'asy ';
          for (key in command_dict)
          {
              exec_command = exec_command.concat(' -' + key + ' ' + command_dict[key] + ' ');
          }
          exec_command = exec_command + util.format('"%s"', asy_input);
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
