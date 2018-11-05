Installation
============

Technisch setzt das Tracking auf einem gepatchten [darkflow](https://github.com/thtrieu/darkflow/tree/master/darkflow) auf. Zum Management der Dependencies bietet sich [Anaconda](http://anaconda.org/) an.

Ein Anaconda-Environment wird mit den folgenden Befehlen eingerichtet:

    conda create -n tf
    source activate tf
    conda install cython numpy numpy-base opencv py-opencv scikit-learn tensorflow tensorflow-gpu

Darkflow kann über dieses Repository eingerichtet werden:

    git clone https://github.com/bendidi/Tracking-with-darkflow
    cd Tracking-with-darkflow
    git submodule update --init --recursive
    cd darkflow
    python3 setup.py build_ext --inplace

Im Verzeichnis `darkflow/darkflow/net/yolov2/` wird die Datei `predict.py` erweitert, so dass keine "zu großen" Bounding Boxes erzeugt werden:

    if len(detections) < 5  and self.FLAGS.BK_MOG:
    	detections = detections + extract_boxes(mask)
    detections = np.array(detections)
    detections = [x for x in detections if x[2] < 300] # <== add this line
    if self.FLAGS.tracker == "deep_sort":

Die Datei `darkflow/darkflow/net/help.py` wird erweitert, die geänderte Datei findet sich unter `patches/help.py` und muss an den genannten Pfad kopiert werden.
