/* @flow */

import * as React from 'react'
import { fetchTopStories } from 'flow-cookbook-hacker-news'
import './App.css'
import StoryListItem from './StoryListItem'
import StoryView from './StoryView'

import type { Story } from 'flow-cookbook-hacker-news'

type AppProps = {
  numStories: number,
}

type AppState = {
  selectedStory?: ?Story,
  stories?: Story[],
  error?: Error,
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    fetchTopStories(this.props.numStories /* number of stories to fetch */)
      .then(stories => {
        // On success, update component state with an array of stories
        this.setState({ stories })
      })
      .catch(error => {
        // On error, update state to capture the error for display
        this.setState({ error })
      })
  }

  render() {
    const { error, selectedStory, stories } = this.state

    let content
    if (error) {
      // an error occurred fetching stories
      content = <p className="error">{error.message}</p>
    }
    else if (selectedStory) {
      // the user is looking at comments on a story
      content = <StoryView
        story={selectedStory}
        onNavigateBack={() => this.deselectStory()}
      />
    }
    else if (stories) {
      // stories are loaded, so display a line item for each story
      content = stories.map(story => (
        <StoryListItem
          story={story}
          onSelect={() => this.selectStory(story)}
          key={story.id}
        />
      ))
    }
    else {
      // no error and no stories means that stories are still loading
      content = <p className="loading">loading...</p>
    }

    return (
      <div className="App">
        <div className="App-header">
          <h1>Flow Cookbook: React Example</h1>
        </div>
        <div>
          {content}
        </div>
      </div>
    )
  }

  selectStory(story: Story) {
    this.setState({ selectedStory: story })
  }

  deselectStory() {
    this.setState({ selectedStory: null })
  }
}

export default App
