type RecordItem = {
  tag: Tag;
  notes: string;
  type: string;
  amount: number;
  createAt : string;
}

type Tag = {
  id: string;
  name: string;
  text:string;
}

type DefaultTag = {
  iconName: string;
  tagName: string;
}

type RootState = {
  recordList: RecordItem[],
  expend_tagList: Tag[],
  income_tagList: Tag[],
  createTagError: Error | null,
  createRecordError: Error | null,
  currentTag?: Tag,
  selectedTag: Tag,
}