export const setName = name => localStorage.setItem('DatSplitName', name);

export const getName = () => localStorage.getItem('DatSplitName');

export const hasName = () => !!localStorage.getItem('DatSplitName');

