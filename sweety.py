import speech_recognition as sr
import pyttsx3
import pywhatkit
import datetime
import wikipedia

listener = sr.Recognizer()
engine = pyttsx3.init()
voices = engine.getProperty('voices')
engine.setProperty('voice',voices[1].id)


def talk(text):
    engine.say(text)
    engine.runAndWait()


def take_command():
 try:
    with sr.Microphone() as source:
        print('listening...')
        voice = listener.listen(source)
        command = listener.recognize_google(voice)
        command = command.lower()
        if 'sweety' in command:
            command = command.replace('sweety', '')
            print(command)
 except:
    pass
 return command


def run_sweety():
    command = take_command()

    if 'play' in command:
        song = command.replace('play', '')
        talk('playing' + song)
        pywhatkit.playonyt(song)
    elif 'time' in command:
        time = datetime.datetime.now().strftime('%I:%M %p')
        talk('current time is' + time)
    elif 'who is' in command:
        person = command.replace('who is', '')
        info = wikipedia.summary(person,2)
        print(info)
        talk(info)
    elif 'how are you' in command:
        print('im good as always')
        talk('im good as always')
        print('by the way.,how is your crush')
        talk('by the way.,how is your crush')
    
    else:
        talk('please say that again')
while True:
      run_sweety()
