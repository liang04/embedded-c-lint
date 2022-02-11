import {
	CompletionItem,
	CompletionItemKind,
	TextDocumentPositionParams
} from 'vscode-languageserver/node';

export function getCompletionItems(_textDocumentPosition: TextDocumentPositionParams) : CompletionItem[] {

	const keyWords = [ 'Robustel', 'Edge2Cloud'];

	if (_textDocumentPosition.textDocument.uri.indexOf('edge2cloud') != -1) {
		keyWords.push('e2c_broker');
		keyWords.push('e2c_s_modbus');
		keyWords.push('e2c_s_routerio');
		keyWords.push('e2c_n_mqtt');
		keyWords.push('e2c_n_aws');
		keyWords.push('e2c_n_azure');
	}

	const items = [];
	let index = 1;
	for (const word of keyWords) {
		const item = {
			label: word,
			kind: CompletionItemKind.Text,
			data: index
		};

		items.push(item);
		index++;
	}
	
	return items;
}
