type RecordItem = {
  tag: Tag;
  notes: string;
  type: string;
  amount: number;
  createAt?: string;
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
  currentTag?: Tag,
  default_expend_tags: DefaultTag[],
  default_income_tags: DefaultTag[]
}