import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { Component } from 'react';
import { ScrollView, Image, TouchableOpacity, View } from 'react-native';
import images from '../../assets/images';

class CategoryScroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        { id: 'hamburger', url: images.hamburger },
        { id: 'ramen', url: images.ramen },
        { id: 'pizza', url: images.pizza },
        { id: 'steak', url: images.steak },
        { id: 'popcorn', url: images.popcorn },
      ],
      selectedCategoryId: 'hamburger',
    };
  }

  handlePress = categoryId => {
    this.setState({ selectedCategoryId: categoryId });
    this.props.changeCategory(categoryId);
  };

  drawUnderline = (a, b) => {
    return <View style={{ height: 5, backgroundColor: 'red' }} />;
  };

  render() {
    return (
      <ScrollView
        horizontal
        contentContainerStyle={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
        {this.state.categories.map(category => (
          <TouchableOpacity key={category.id} onPress={() => this.handlePress(category.id)}>
            <Image source={category.url} style={{ width: 48, height: 48 }} />
            {this.state.selectedCategoryId === category.id &&
              this.drawUnderline(this.state.selectedCategoryId, category.id)}
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }
}

export default CategoryScroll;
