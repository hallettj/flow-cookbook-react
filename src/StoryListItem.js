/* @flow */

import React from 'react'

import type { Story } from 'flow-cookbook-hacker-news'

type StoryListItemProps = {
  story: Story,
  onSelect: () => void,
}

export default function StoryListItem(props: StoryListItemProps): React.Element<*> {
  const { by, title } = props.story
  return <p>
    <a href="#" onClick={event => selectStory(props, event)}>
      {title}
    </a> posted by {by}
  </p>
}

function selectStory(props: StoryListItemProps, event: Event) {
  event.preventDefault()
  props.onSelect()
}
