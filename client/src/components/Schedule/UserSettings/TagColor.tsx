import React, { useCallback } from 'react';
import TagColorIcon from './TagColorIcon';
import { Collapse, Tag, Divider, InputNumber, Typography } from 'antd';
import { GithubPicker, ColorState as IColorState } from 'react-color';
import { pickerColors, setTagColor, getTagStyle } from './userSettingsHandlers';

const { Panel } = Collapse;
const { Text } = Typography;

type Props = {
  tags: string[];
  storedTagColors?: object;
  onSaveTagColors: (value: object) => void;
  limitForDoneTask?: number;
  onSaveLimitForDoneTask: (value: number) => void;
};

const TagColor: React.FC<Props> = ({
  storedTagColors,
  onSaveTagColors,
  tags,
  limitForDoneTask,
  onSaveLimitForDoneTask,
}) => {
  const memoizedSetTagColor = useCallback(
    (e: IColorState, tagName, storedTagColors) => {
      setTagColor(e, tagName, onSaveTagColors, storedTagColors);
    },
    [storedTagColors],
  );

  const onChangeLimit = useCallback(limit => {
    onSaveLimitForDoneTask(limit);
  }, []);

  const collapseTags = (
    <Collapse accordion ghost>
      {tags.map(tag => {
        return (
          <Panel header={<Tag style={getTagStyle(tag, storedTagColors, { cursor: 'pointer' })}>{tag}</Tag>} key={tag}>
            <GithubPicker
              colors={pickerColors}
              triangle="hide"
              width={'138px'}
              onChange={e => memoizedSetTagColor(e, tag, storedTagColors)}
            />
          </Panel>
        );
      })}
    </Collapse>
  );

  return (
    <>
      <Collapse expandIcon={() => <TagColorIcon />}>
        <Panel header="Change Tag Color" key="tags">
          {collapseTags}
        </Panel>
      </Collapse>
      <Divider />
      <Text strong>Limit for done tasks (%):</Text>
      <InputNumber min={0} max={100} defaultValue={limitForDoneTask} onChange={onChangeLimit} />
    </>
  );
};

export default TagColor;
