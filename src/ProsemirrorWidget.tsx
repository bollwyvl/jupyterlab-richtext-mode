// import {EditorState} from "prosemirror-state"
// import {EditorView} from "prosemirror-view"
// import {
//     Widget,
//     PanelLayout
// } from "@phosphor/widgets";
// import {keymap} from "prosemirror-keymap"
// import {baseKeymap} from "prosemirror-commands"
// import { MarkdownCell, MarkdownCellModel } from '@jupyterlab/cells';
// import {
//     Message
// } from '@phosphor/messaging';
// import {
//     ReactWidget
// } from '@jupyterlab/apputils';
// import RichTextMenu from './RichTextMenu';
// import React from 'react';
// //@ts-ignore
// import {exampleSetup} from "prosemirror-example-setup"
// // import { Schema } from "prosemirror-model";
// // import { schema } from "./prosemirro
// // import * as scripts from "./prosemirror-scripts"

// // import { INotebookTracker } from "@jupyterlab/notebook";
// // import { schema } from './prosemirror/prosemirror-schema';
// import * as Markdown from './prosemirror/markdown';
// // import { schema } from 'prosemirror-schema-basic';





// export default class ProseMirrorWidget extends Widget {

//     /**
//      * The editor itself.
//      */
//     public _view: EditorView<any>;

//     /**
//      * The 'div' element that wraps around the editor.
//      */
//     private _wrapper: HTMLDivElement;

//     /**
//      * The currently active Markdown cell model for updating.
//      */
//     private _model: MarkdownCellModel;

//     /**
//      * The currently active Markdown cell. 
//      */
//     private _cell: MarkdownCell;

//     // /**
//     //  * The schema of the ProseMirror editor.
//     //  */
//     // private _schema: Schema;

//     /**
//      * The menu widget.
//      * 
//      */
//     private _menu: Widget;

//     /**
//      *  Creates a Prosemirror text editor and attaches it to the widget's node. 
//      * @param cell Should replace with an IOption object at some point, but takes in Markdown cell for updating.
//      * 
//      */
//     constructor(cell: MarkdownCell) {
//         super();

//         this.addClass("editor");

//         this._cell = cell;
//         this._model = (cell.model as MarkdownCellModel);

//         let source = this._model.toJSON().source;
//         this._wrapper = document.createElement("div");
//         console.log(source);

//         let parser =  Markdown.parser;
        
//         this._view = new EditorView(this._wrapper, {
//         state: EditorState.create({
//             doc: parser.parse(
//                 typeof source === "string" ? source : source.join('')
//             ),
//             plugins: [
//                 keymap(baseKeymap)
//             ]
//         })
//         });

//         this.node.appendChild(this._wrapper);

//         // Get cell header
//         const cellHeader = (this._cell.layout as PanelLayout).widgets[0].node;
//         this._menu = ReactWidget.create(<RichTextMenu view={this._view} model={this._model} />);
//         cellHeader.classList.add("header");

//         Widget.attach(this._menu, cellHeader);

//         this._model.contentChanged.connect(() => {
//             this._cell.update();
//         }) 
    
//     }  


//     /**
//      * The execute function for the 'Shift Enter' command for the ProseMirror editor. 
//      * 
//      * Serializes the current editor's value/text into Markdown, which updates the 
//      * cell model's value, prompting the contentChanged signal, sending
//      * an update request to the cell and thus rendering the Markdown. 
//      *
//      */
//     public runCommand(): void {
//         console.log(this._view.state.doc);

//         let serializer = Markdown.serializer;

//         const source = serializer.serialize(
//             this._view.state.doc
//           );
//           console.log(source);

//         if (source.trim() === this._model.value.text.trim()) { // If no text change, force render. 
//             this._cell.update();
//             return ;
//         }

//         Widget.detach(this._menu);

//         this._model.value.text = source;


//     }

//   /**
//    * Handle the DOM events for the ProseMirror editor.
//    *
//    * @param event - The DOM event sent to the widget.
//    *
//    * #### Notes
//    * This method implements the DOM `EventListener` interface and is
//    * called in response to events on the panel's DOM node. It should
//    * not be called directly by user code.
//    */
//   handleEvent(event: Event): void {
//     switch (event.type) {
//       case 'dblclick':
//         this._evtDblClick(event as MouseEvent);
//         break;
//       default:
//           break;
//     }
//   }

//   /**
//    * Handles the double-click event for the ProseMirror editor.
//    * 
//    * Prevents the default action of showing the default editor. 
//    * 
//    * @param event - The DOM event sent to the widget.
//    */
//   private _evtDblClick(event: MouseEvent) {
//       event.preventDefault();
//       event.stopPropagation();
//   }

//   /**
//    * A message handler invoked on an `'after-attach'` message.
//    * 
//    * Attaches a 'dblclick' event listener onto this widget's node. 
//    */
//   protected onAfterAttach(msg: Message): void {
//       super.onAfterAttach(msg);
//       let node = this.node;

//       node.addEventListener('dblclick', this);
//   }
// }

