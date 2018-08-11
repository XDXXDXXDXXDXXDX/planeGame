//基础配置信息
var CONFIG = {
    enemySpeed: 4,
    planeSize: {
        width: 50,
        height: 40
    },
    enemySmallSize: {
        width: 54,
        height: 40
    },
    enemyBigSize: {
        width: 130,
        height: 100
    },
    bulletSize: {
        width: 20,
        height: 20
    },
    bulletSpeed: 10,
    resources: {
        images: [
          { src: './img/plane_1.png',
            name: 'plane1'
          },
          { src: './img/plane_2.png',
            name: 'plane2'
          },
          { src: './img/fire.png',
            name: 'fireIcon'
          },
          { src: './img/enemy_big.png',
            name: 'enemyBigIcon'
          },
          { src: './img/enemy_small.png',
            name: 'enemySmallIcon'
          },
          { src: './img/boom_big.png',
            name: 'enemyBigBoomIcon'
          },
          { src: './img/boom_small.png',
            name: 'enemySmallBoomIcon'
          }
        ],
        sounds: [
          { 
            src: './sound/biu.mp3',
            name: 'hitSound'
          },
          { src: './sound/bgm.mp3',
            name: 'gameSound'
          },
          { src: './sound/die.mp3',
            name: 'dieSound'
          },
          { src: './sound/button.mp3',
            name: 'buttonSound'
          },
          { src: './sound/boom.mp3',
            name: 'boomSound'
          },
          { src: './sound/win.mp3',
            name: 'win'
          },
        ]
    }


};