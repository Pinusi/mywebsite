# mywebsite
## Structure
<ol>
<li>
SPEC</br>
Folder with all the tests of the project.</br>
Each class has a different test file in the test folder.</br>
Tests get compiled (by gulp) in a requirejs file (test.min.js) which gets executed in the index.html page in the spec folder and that includes all necessary files.
</li>
<li>SRC</br>
In this folder there are all the source files.</br>
<ul>
<li>api: json file</li>
<li>app: all js files and underscore templates which get compiled in the script.min.js.</li>
<li>assets: fonts and images.</li>
<li>sass: all css rules which get compiled in main.css.</li>
<li>vendor: bower install here all the files from which we can take the ones we need.</li>
</ul>
</li>
<li>
TOOLS</br>
In the tools folder there are all files to get the website built (Run here "gulp" command).
<ul>
<li>gulpfile.js: from which you can start the build.</li>
<li>bower.json: file that downloads all the vendor dependecies.</li>
<li>package.json: for node dependencies.</li>
</ul>
</li>
</ol>

