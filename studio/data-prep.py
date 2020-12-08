import json

with open('./data.json') as f:
    data = json.load(f)

topics = []
authors_temp = []
authors = []
questions = []
questions_temp = []

all_posts = data['data']['allPosts']

for post in all_posts:
    # add topic
    topic_id = post['id']
    children = []
    for child in post['children']:
        children.append({
            '_ref': child['id'],
            '_type': 'reference'
        })
    topic = {
        '_type': 'topic',
        'title': post['titulek'],
        '_id': topic_id,
        'children': children
    }
    parent = post['parent']
    topics.append(topic)
    # add authors and question
    for content in post['content']:
        if 'quizLink' not in content:
            continue
        quiz = content['quizLink']
        author = quiz['authors'][0]
        author_id = author['id']
        if author_id not in authors_temp:
            authors_temp.append(author_id)
            Author = {
                '_type': 'author',
                '_id': author_id,
                'name': author['name']
            }
            authors.append(Author)
        items = quiz['items']
        for item in items:
            item_id = item['id']
            if item_id in questions_temp:
                continue
            questions_temp.append(item_id)
            qtopics = [{'_type': 'reference', '_ref': topic_id}]
            if parent:
                qtopics.append({'_type': 'reference', '_ref': parent['id']})
            q = {
                '_type': 'question',
                'question': item['question'],
                '_id': item_id,
                'topics': qtopics,
                'author': {'_type': 'reference', '_ref': author_id}
            }
            answers = []
            answerType = 'singleSelectAnswer'
            answerName = 'answer'
            if item['_modelApiKey'] == 'checkbox':
                answerType = 'multipleChoiceAnswer'
                answerName = 'choice'
            for r in item['possibleResponds']:
                if 'isCorrect' not in r:
                    continue
                correct = r['isCorrect']
                a = {
                    '_type': answerType,
                    answerName: r['choiceText'],
                    'correctFeedback': r['correctFeedback'],
                    'incorrectFeedback': r['incorrectFeedback'],
                    'isCorrect': correct
                }
                answers.append(a)
            if item['_modelApiKey'] == 'singleselect':
                q['singleSelectAnswers'] = answers
            if item['_modelApiKey'] == 'checkbox':
                q['multipleChoiceAnswers'] = answers
            # print(q)
            questions.append(q)
        # print(quiz)
for author in authors:
    print(json.dumps(author))
for topic in topics:
    print(json.dumps(topic))
for question in questions:
    print(json.dumps(question))
