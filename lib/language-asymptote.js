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
      'language-asymptote:toggle': () => this.toggle()
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
  }

};
