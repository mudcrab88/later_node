const sqlite3 = require('sqlite3').verbose();
const dbName = 'later.sqlite';
const db = new sqlite3.Database(dbName);

//  Создает таблицу articles, если она еще не существует.
db.serialize(() => { 
    const sql = 'CREATE TABLE IF NOT EXISTS articles (id integer primary key, title, content TEXT)';
    db.run(sql);
});

class Article {
    static all(cb) {
        db.all('SELECT * FROM articles', cb); //Выбирает все записи
    }

    static find(id, cb) {
        db.get('SELECT * FROM articles WHERE id = ?', id, cb); //Выбирает конкретную статью
    }

    static create(data, cb) {
        const sql = 'INSERT INTO articles(title, content) VALUES (?, ?)';
        db.run(sql, data.title, data.content, cb); //Вопросительные знаки задают параметры.
    }
    static delete(id, cb) {
        if (!id) return cb(new Error('Please provide an id')); 
        db.run('DELETE FROM articles WHERE id = ?', id, cb);
    }
}

module.exports = db;
module.exports.Article = Article;