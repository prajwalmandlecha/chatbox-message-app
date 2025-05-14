useLayoutEffect(() => {
  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity onPress={onSignOut} style={{ marginRight: 10 }}>
        <Text style={{ color: "white" }}>Sign Out</Text>
      </TouchableOpacity>
    ),
  });
}, [navigation]);
