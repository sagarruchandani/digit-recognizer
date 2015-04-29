from sklearn.neighbors import KNeighborsClassifier
from sklearn import decomposition
import numpy as np
import csv
PCA_COMPONENTS = 100


def doWork():

    train, labels = read_data("../data/train.csv")
    test, tmpl = read_data("../data/output3.csv", test=True)
    print tmpl

    print "Converting training set to matrix"
    X_train = np.mat(train)

    print "Fitting PCA. Components: %d" % PCA_COMPONENTS
    pca = decomposition.PCA(n_components=PCA_COMPONENTS).fit(X_train)

    print "Reducing training to %d components" % PCA_COMPONENTS
    X_train_reduced = pca.transform(X_train)

    print "Fitting kNN with k=10, kd_tree"
    knn = KNeighborsClassifier(n_neighbors=10, algorithm="kd_tree")
    print knn.fit(X_train_reduced, labels)

    print "Reducing test to %d components" % PCA_COMPONENTS
    X_test_reduced = pca.transform(test)

    print "Preddicting numbers"
    predictions = knn.predict(X_test_reduced)

    print "Writing to file"
    write_to_file(predictions)

    return predictions

def read_data(f, header=True, test=False):
    data = []
    labels = []

    csv_reader = csv.reader(open(f, "r"), delimiter=",")
    index = 0
    for row in csv_reader:
        index = index + 1
        if header and index == 1:
            continue

        if not test:
            labels.append(int(row[0]))
            row = row[1:]

        data.append(np.array(np.int64(row)))
    return (data, labels)



def write_to_file(predictions):
    f = open("output-pca-knn-skilearn-v3.csv", "w")
    for p in predictions:
        f.write(str(p))
        f.write("\n")
    f.close()


if __name__ == '__main__':

  
    print doWork()
