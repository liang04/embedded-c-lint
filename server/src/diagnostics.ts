import {
	Range,
	Diagnostic,
	DiagnosticSeverity
} from 'vscode-languageserver/node';

import {
	TextDocument
} from 'vscode-languageserver-textdocument';


export function checkCopyRight(textDocument: TextDocument) : Diagnostic | null {
	const pos1 = {
		line: 0,
		character: 0
	};

	const pos2 = {
		line: 10,
		character: 0
	};

	const text = textDocument.getText(Range.create(pos1, pos2));
	const pattern  = /Copyright/i;
	const m = pattern.exec(text);
	
	if (m != null) {
		return null;
	}
	else {
		const diagnostic: Diagnostic = {
			severity: DiagnosticSeverity.Warning,
			range: {
				start: textDocument.positionAt(0),
				end: textDocument.positionAt(text.indexOf('\n'))
			},
			message: `No copyright message found.`,
			source: 'rbt'
		};

		diagnostic.relatedInformation = [
			{
				location: {
					uri: textDocument.uri,
					range: Object.assign({}, diagnostic.range)
				},
				message: 'File Structure'
			}
		];
		return diagnostic;
	}

}
