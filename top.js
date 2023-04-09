// 最初に投稿リストを表示する
renderPosts();

// 投稿リストを表示する関数
function renderPosts() {
  // 投稿リストの要素を取得する
  const postList = document.getElementById('post-list');

  // 投稿リストを初期化する
  postList.innerHTML = '';

  // 投稿を取得する
  const posts = getPosts();

  // 投稿を表示する
  posts.forEach((post) => {
    // 投稿アイテムを作成する
    const postItem = document.createElement('li');
    postItem.classList.add('post');

    // 投稿タイトルを作成する
    const postTitle = document.createElement('h3');
    postTitle.textContent = post.title;

    // 投稿本文を作成する
    const postBody = document.createElement('p');
    postBody.textContent = post.body;

    // 投稿アイテムにタイトルと本文を追加する
    postItem.appendChild(postTitle);
    postItem.appendChild(postBody);

    // 投稿リストにアイテムを追加する
    postList.appendChild(postItem);
  });
}

// 新しい投稿を追加する関数
function addPost(e) {
  // フォームの送信をキャンセルする
  e.preventDefault();

  // フォームの値を取得する
  const title = document.getElementById('post-title').value;
  const body = document.getElementById('post-body').value;

  // 新しい投稿を作成する
  const newPost = {
    title: title,
    body: body,
    comments: []
  };

  // 投稿を保存する
  savePost(newPost);

  // 投稿リストを再描画する
  renderPosts();

  // フォームをリセットする
  document.getElementById('post-form').reset();
}

// 新しいコメントを追加する関数
function addComment(postIndex, comment) {
  // 投稿を取得する
  const posts = getPosts();

  // コメントを追加する
  posts[postIndex].comments.push(comment);

  // 投稿を保存する
  savePosts(posts);

  // 投稿リストを再描画する
  renderPosts();
}

// 投稿を取得する関数
function getPosts() {
  let posts = localStorage.getItem('posts');

  if (!posts) {
    posts = [];
  } else {
    posts = JSON.parse(posts);
  }

  return posts;
}

// 投稿を保存する関数
function savePost(post) {
  const posts = getPosts();
  posts.push(post);
  savePosts(posts);
}

// 投稿を保存する関数
function savePosts(posts) {
  localStorage.setItem('posts', JSON.stringify(posts));
}

// フォームのイベントリスナーを設定する
const postForm = document.getElementById('post-form');
postForm.addEventListener('submit', addPost);
