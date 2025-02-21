self.onmessage = function (e) {
    const { iterations } = e.data;
    let result = 0;

    for (let i = 0; i < iterations; i++)
        for (let j = 0; j < 10; j++)
            result += j;

    self.postMessage(result);
};
