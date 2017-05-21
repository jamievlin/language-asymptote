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

  compile() {
      let editor;
      if (editor = atom.workspace.getActiveTextEditor()) {

          let asy_proc = require('child_process');
          let path = require('path');
          let util = require('util');

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
